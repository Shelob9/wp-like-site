import { WpPost } from '../../wpTypes';
import { WpApiPost, WpApiMedia } from './wpApiTypes';
import { fetchPost } from './fetchPost';
import { fetchAuthor } from './fetchAuthor';
import { fetchFeatured } from './fetchFeatured';
import { fetchTags } from './fetchTags';
import wpFactory from './factories/wpFactory';

/**
 * Get a post by slug
 *
 * @param slug
 * @param endpoint
 */
export const getRemotePost = async (
  slug: string,
  endpoint: string
): Promise<WpPost> => {
  const post = await fetchPost(slug as string, endpoint);
  const author = await fetchAuthor(post.author, endpoint);
  let featured: WpApiMedia | undefined = undefined;
  if (post.featured_media) {
    try {
      featured = await fetchFeatured(post.featured_media, endpoint);
    } catch {
      (e: Error) => {
        console.log(e);
      };
    }
  }

  const tags = await fetchTags(post.tags as Array<number>, endpoint);
  const published = post.date;

  const factory = wpFactory({
    author: () => author,
    featured: () => featured || undefined,
    tags: () => tags,
    published: () => published,
  });

  const wpLikePost = await factory.convertPost(post);

  return wpLikePost;
};

/**
 * Given a WP API Post, collect all data to make a WpPost
 *
 * @param post
 * @param endpoint
 */
export const collectPost = async (post: WpApiPost, endpoint: string) => {
  return getRemotePost(post.slug, endpoint).then((r: WpPost) => {
    return r;
  });
};

/**
 * Given an array of WP API Posts, collect all data to make a WpPost
 *
 * @param posts
 * @param endpoint
 */
export const collectPosts = async (
  posts: Array<WpApiPost>,
  endpoint: string
): Promise<Array<WpPost>> => {
  return Promise.all(
    posts.map((post: WpApiPost) => collectPost(post, endpoint))
  );
};
