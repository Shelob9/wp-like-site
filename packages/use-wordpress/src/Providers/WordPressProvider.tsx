import React, { ReactChild, useReducer } from 'react';
import {
  WpPost,
  wpPostCollection,
  wpAuthorCollection,
  WpAuthor,
  wpMeditaCollection,
  WpMedia,
  WpTag,
  wpTagCollection,
} from 'wpTypes';
import { fetchPosts } from 'fetch/wordpress';
import { fetchWpLikePostData } from 'fetch/wordpress/collectPosts';
import { Image } from 'types';
type wpPostPage = {
  pageNumber: number;
  postIds: string[];
};

type wpPostPages = {
  [key: number]: wpPostPage;
};

const WordPressContent = React.createContext<{
  addPost: (post: WpPost) => void;
  getPost: (id: string) => WpPost | undefined;
  hasPost: (id: string) => boolean;
  getAuthor: (id: string) => WpAuthor | undefined;
  hasAuthor: (id: string) => boolean;
  addAuthor: (id: WpAuthor) => void;
  getMedia: (id: string) => WpMedia | undefined;
  hasMedia: (id: string) => boolean;
  addMedia: (id: WpMedia) => void;
  getTag: (id: string) => WpTag | undefined;
  hasTag: (id: string) => boolean;
  addTag: (id: WpTag) => void;
  fetchPageOfPosts: (pageNumber: number) => void;
  getPageOfPosts: (pageNumber: number) => wpPostPages | undefined;
  hasPageOfPosts: (pageNumber: number) => boolean;
}>(
  //@ts-ignore
  null
);

type PostAction = { type: 'ADD'; post: WpPost };

const postsReducer = (state: wpPostCollection, action: PostAction) => {
  switch (action.type) {
    case 'ADD':
      state[action.post.id] = action.post;
      return state;
  }
};

type AuthorsAction = { type: 'ADD'; author: WpAuthor };

const authorsReducer = (state: wpAuthorCollection, action: AuthorsAction) => {
  switch (action.type) {
    case 'ADD':
      state[action.author.id] = action.author;
      return state;
  }
};

type MediaAction = { type: 'ADD'; media: WpMedia };

const mediaReducer = (state: wpMeditaCollection, action: MediaAction) => {
  switch (action.type) {
    case 'ADD':
      state[action.media.id] = action.media;
      return state;
  }
};

type TagAction = { type: 'ADD'; tag: WpTag };

const tagReducer = (state: wpTagCollection, action: TagAction) => {
  switch (action.type) {
    case 'ADD':
      state[action.tag.id] = action.tag;
      return state;
  }
};

type PageAction = { type: 'ADD'; page: wpPostPage };
const pageReducer = (state: wpPostPages, action: PageAction) => {
  switch (action.type) {
    case 'ADD':
      state[action.page.pageNumber] = action.page;
      return state;
  }
};

export const WordPressContentProvider = (props: {
  children: ReactChild;
  endpoint: string;
}) => {
  const { endpoint } = props;

  const [posts, postsDispatch] = useReducer(postsReducer, {});
  const [authors, authorDispatch] = useReducer(authorsReducer, {});
  const [medias, mediaDispatch] = useReducer(mediaReducer, {});
  const [tags, tagsDispatch] = useReducer(tagReducer, {});
  const [pages, pagesDispatch] = useReducer(pageReducer, {});

  const hasPost = (id: string) => posts.hasOwnProperty(id);
  const addPost = (post: WpPost) => postsDispatch({ type: 'ADD_POST', post });

  const getPost = (id: string) => (hasPost(id) ? posts[id] : undefined);
  const addMedia = (media: WpMedia) => mediaDispatch({ type: 'ADD', media });
  const hasMedia = (id: string) => medias.hasOwnProperty(id);
  const getMedia = (id: string) => (hasMedia(id) ? medias[id] : undefined);

  const hasAuthor = (id: string) => authors.hasOwnProperty(id);
  const getAuthor = (id: string): WpAuthor | undefined =>
    hasAuthor(id) ? authors[id] : undefined;
  const addAuthor = (author: WpAuthor) =>
    authorDispatch({ type: 'ADD', author });

  const hasTag = (id: string) => tags.hasOwnProperty(id);
  const getTag = (id: string): WpTag | undefined =>
    hasTag(id) ? tags[id] : undefined;
  const addTag = (tag: WpTag) => tagsDispatch({ type: 'ADD', tag });

  const fetchPageOfPosts = async (pageNumber: number) => {
    let promises: Array<Promise<WpPost>> = [];
    const postIds: string[] = [];
    fetchPosts(endpoint, pageNumber).then(posts => {
      posts.forEach(post => promises.push(fetchWpLikePostData(post, endpoint)));
    });
    Promise.all(promises).then((posts: WpPost[]) => {
      posts.forEach((post: WpPost) => {
        postIds.push(post.id);

        addAuthor(post.author);
        if (undefined !== post.featured) {
          addMedia(post.featured);
        }
        if (post.tags) {
          post.tags.forEach(tag => {
            addTag(tag);
          });
        }
      });
    });
    pagesDispatch({
      type: 'ADD',
      page: {
        pageNumber,
        postIds,
      },
    });
  };

  const hasPageOfPosts = (pageNumber: number) =>
    pages.hasOwnProperty(pageNumber);
  const getPageOfPosts = (pageNumber: number) =>
    hasPageOfPosts(pageNumber) ? pages[pageNumber] : undefined;

  return (
    <WordPressContent.Provider
      value={{
        hasPost,
        getPost,
        addPost,
        hasAuthor,
        getAuthor,
        addAuthor,
        hasMedia,
        addMedia,
        getMedia,
        hasTag,
        getTag,
        addTag,
        fetchPageOfPosts,
        hasPageOfPosts,
        getPageOfPosts,
      }}
    >
      {props.children}
    </WordPressContent.Provider>
  );
};
