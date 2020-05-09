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

export const WordPressContentProvider = (props: { children: ReactChild }) => {
  const [posts, postsDispatch] = useReducer(postsReducer, {});
  const [authors, authorDispatch] = useReducer(authorsReducer, {});
  const [medias, mediaDispatch] = useReducer(mediaReducer, {});
  const [tags, tagsDispatch] = useReducer(tagReducer, {});

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
      }}
    >
      {props.children}
    </WordPressContent.Provider>
  );
};
