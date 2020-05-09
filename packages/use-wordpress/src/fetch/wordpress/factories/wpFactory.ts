import { WpApiPost, WpApiUser, WpApiMedia, WpApiTaxonomy } from '../wpApiTypes';
import { WpPost, WpMedia } from '../../../wpTypes';
import { tag, PostAuthor, Image } from '../../../types';

/**
 * Getters for data not included in the WP-API post response
 */
export type wpFactoryGetters = {
  author: (authorId: number) => WpApiUser;
  featured: (featureId: number) => WpApiMedia | undefined;
  tags: (tagIds: Array<number>) => Array<WpApiTaxonomy>;
  published: (published: string) => string;
};

/**
 *
 * @param fromApi
 */
export const tagFromWpApi = (fromApi: WpApiTaxonomy): tag => {
  return {
    label: fromApi.name,
    slug: fromApi.slug,
  };
};

/**
 * Format a collection of tags
 *
 * @param fromApi
 */
export const tagsFromWpApi = (fromApi: Array<WpApiTaxonomy>): Array<tag> => {
  return fromApi.map(tagFromWpApi);
};

const findAvatar = (fromApi: WpApiUser): Image => {
  const avatars = fromApi.avatar_urls;
  const sizes = Object.keys(avatars).map((key: string) => parseInt(key, 10));
  const url = avatars[Math.max(...sizes)];
  return {
    src: url,
    alt: `Avatar for ${fromApi.name}`,
  };
};

/**
 * Format featured image object
 * @param fromApi
 */
export const featuredFromWpApi = (fromApi: WpApiMedia): WpMedia => {
  return {
    //@ts-ignore
    id: fromApi.id,
    src: fromApi.source_url,
    alt: fromApi.alt_text,
    height: fromApi.media_details ? fromApi.media_details.height : undefined,
    width: fromApi.media_details ? fromApi.media_details.width : undefined,
  };
};
/**
 * Prepare author objects for this UI system
 *
 * @param fromApi
 */
export const authorFromWpApi = (fromApi: WpApiUser): PostAuthor => {
  return {
    name: fromApi.name,
    avatar: findAvatar(fromApi),
    description: fromApi.description,
    link: {
      href: fromApi.link,
      text: fromApi.name,
    },
    slug: fromApi.slug,
    id: fromApi.id,
  };
};

/**
 * Prepare post objects for this UI system
 *
 * @param fromApi
 * @param getters
 */
const wpPost = (fromApi: WpApiPost, getters: wpFactoryGetters): WpPost => {
  const { id, slug, content, title, excerpt } = fromApi;
  const featured = getters.featured(fromApi.featured_media);
  return {
    id: id.toString(),
    slug,
    title,
    content,
    excerpt,
    featured: featured ? featuredFromWpApi(featured) : undefined,
    author: authorFromWpApi(getters.author(fromApi.author)),
    published: getters.published(fromApi.date),
    tags: tagsFromWpApi(getters.tags(fromApi.tags ? fromApi.tags : [])),
  };
};

export default function(
  getters: wpFactoryGetters
): {
  convertPost(fromApi: WpApiPost): WpPost;
} {
  return {
    convertPost(fromApi: WpApiPost): WpPost {
      return wpPost(fromApi, getters);
    },
  };
}
