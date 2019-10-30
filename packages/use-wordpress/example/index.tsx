import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import WPAPI from 'wpapi';
import { useRef } from 'react';
export default function useWordPress(endpoint: string) {
  let wp = useRef(new WPAPI({ endpoint }));

  return {
    wp: wp.current,
  };
}

const App = () => {
  const [page, setPage] = React.useState(1);
  const [posts, setPosts] = React.useState<Array<any>>([]);
  const handlePageChange = () => {
    setPage(page + 1);
  };
  const [paging, setPaging] = React.useState({
    total: 0,
    totalPages: 0,
  });
  let wp = useRef(new WPAPI({ endpoint: 'https://calderaforms.com/wp-json' }));

  React.useEffect(() => {
    let isSubscribed = true;
    wp.current
      .posts()
      .page(page)
      .then(data => {
        if (isSubscribed) {
          const _posts: Array<any> = [];
          Object.keys(data).forEach((key: string) => {
            if ('__paging' !== key && data[key].hasOwnProperty('id')) {
              _posts.push(data[key]);
            }
          });
          setPosts(_posts);
        }
      })
      .catch((err: Error) => {
        console.log(err);
      });
    return () => {
      isSubscribed = false;
    };
  }, [setPosts, page]);

  return (
    <div>
      <div>
        <button onClick={handlePageChange}>Next Page</button>
      </div>
      {posts.length && (
        <ul>
          {posts.map((post: { id: number; title: { rendered: string } }) => {
            console.log(post);
            return <li key={post.id}>{post.title.rendered}</li>;
          })}
        </ul>
      )}{' '}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
