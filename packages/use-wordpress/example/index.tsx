import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Demo } from '../.';

const App = () => {
  const [page, setPage] = React.useState(1);
  const handlePageChange = () => {
    setPage(page + 1);
  };
  return (
    <div>
      <div>
        <button onClick={handlePageChange}>Next Page</button>
      </div>
      <Demo page={page} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
