/**
 * One tag for a post/ status.
 */
export interface tag {
  label: string;
  slug: string;
}

/**
 * Parts of post object that are an object expressing content such as post title and post content.
 *
 */
export interface ContentObject {
  rendered: string;
  protected?: Boolean;
  raw?: string;
}

/**
 * An image
 */
export interface Image {
  src: string;
  alt: string;
  height?: number;
  width?: number;
}

export type link = {
  href: string;
  text: string;
  title?: string;
};

/**
 * A post's author
 */
export interface PostAuthor {
  id: number;
  name: string;
  avatar: Image;
  description?: string;
  link?: link;
  slug: string;
}
