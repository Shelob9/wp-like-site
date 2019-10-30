import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import WPAPI from 'wpapi';
import { useRef } from 'react';
export default function useWordPress(endpoint: string) {
  let wp = useRef(new WPAPI({ endpoint }));

  return [wp.current];
}

const App = () => {
  const [page, setPage] = React.useState(1);
  const [posts, setPosts] = React.useState<Array<any>>([]);
  const [wp] = useWordPress('https://calderaforms.com/wp-json');
  const nextPage = () => {
    setPage(page + 1);
  };
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const [paging, setPaging] = React.useState({
    total: 0,
    totalPages: 0,
  });

  React.useEffect(() => {
    if (!wp) {
      return;
    }
    let isSubscribed = true;
    wp.posts()
      .page(page)
      .then(data => {
        console.log(data);
        if (isSubscribed) {
          const _posts: Array<any> = [];
          Object.keys(data).forEach((key: string) => {
            if ('_paging' !== key && data[key].hasOwnProperty('id')) {
              _posts.push(data[key]);
            }
          });
          setPaging(data._paging);
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
        <button onClick={previousPage} disabled={1 === page ? true : false}>
          Previous Page
        </button>
        <button
          onClick={nextPage}
          disabled={paging.totalPages === page ? true : false}
        >
          Next Page
        </button>
        <ul>
          <li>Total Pages: {paging.totalPages}</li>
          <li>Current Page: {page}</li>
          <li>Total Posts: {paging.total}</li>
        </ul>
      </div>
      {posts.length && (
        <ul>
          {posts.map((post: { id: number; title: { rendered: string } }) => {
            console.log(post);
            return <li key={post.id}>{post.title.rendered}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
