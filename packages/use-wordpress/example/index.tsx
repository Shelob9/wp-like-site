import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import WPAPI from 'wpapi';
import { useRef } from 'react';
export default function useWordPress(endpoint: string) {
  let wp = useRef(new WPAPI({ endpoint }));

  return [wp.current];
}

function usePaging() {
  const [currentPage, setPage] = React.useState(1);

  const [paging, setPaging] = React.useState({
    total: 0,
    totalPages: 0,
  });
  const hasNextPage = () => {
    return paging.totalPages === currentPage ? false : true;
  };

  const hasPreviousPage = () => {
    return 1 !== currentPage;
  };

  const goToNextPage = () => {
    setPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    setPage,
    paging,
    setPaging,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  };
}

function useWordPressPosts(wp) {
  const {
    currentPage,
    setPage,
    paging,
    setPaging,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = usePaging();
  const [posts, setPosts] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    if (!wp) {
      return;
    }
    let isSubscribed = true;
    wp.posts()
      .page(currentPage)
      .then(data => {
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
  }, [setPosts, currentPage]);

  return {
    posts,
    currentPage,
    paging,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  };
}
const App = () => {
  const [wp] = useWordPress('https://calderaforms.com/wp-json');
  const {
    posts,
    currentPage,
    paging,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useWordPressPosts(wp, {});

  return (
    <div>
      <div>
        <button onClick={goToPreviousPage} disabled={!hasPreviousPage()}>
          Previous Page
        </button>
        <button onClick={goToNextPage} disabled={!hasNextPage()}>
          Next Page
        </button>
        <ul>
          <li>Total Pages: {paging.totalPages}</li>
          <li>Current Page: {currentPage}</li>
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
