import React, { useEffect, useState } from 'react';
import useWordPress from './useWordPress';

export const Demo = (props: { page: number }) => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const { wp } = useWordPress('https://ninjaforms.com/wp-json');
  useEffect(() => {
    wp.posts()
      .page(props.page)
      .then((data: Array<any>) => {
        console.log(data);
        setPosts(data);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  }, [setPosts, props.page]);

  return (
    <div>
      <h1>Demo</h1>
      <h2>Posts</h2>
      {posts.length && (
        <ul>
          {posts.map((post: { id: number; title: { rendered: string } }) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
