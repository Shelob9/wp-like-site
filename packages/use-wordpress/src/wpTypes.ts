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
  featured: Image | undefined;
  author: PostAuthor;
  tags?: Array<tag>;
}

export interface WpAuthor extends PostAuthor {}

export interface WpMedia extends Image {}

export interface WpTag {}
