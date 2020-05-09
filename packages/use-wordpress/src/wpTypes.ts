import { PostAuthor, Image, tag, ContentObject } from './types';

/**
 * A WordPress-like post.
 */
export interface WpPost {
  id: string;
  slug: string;
  title: ContentObject;
  content: ContentObject;
  excerpt: ContentObject;
  published: string;
  featured: WpMedia | undefined;
  author: PostAuthor;
  tags?: WpTag[];
}

export type wpPostCollection = { [key: string]: WpPost };

export interface WpAuthor extends PostAuthor {}

export type wpAuthorCollection = { [key: string]: WpAuthor };

export interface WpMedia extends Image {
  id: number;
}
export type wpMeditaCollection = { [key: string]: WpMedia };

export interface WpTag extends tag {
  id: number;
}
export type wpTagCollection = { [key: string]: WpTag };
