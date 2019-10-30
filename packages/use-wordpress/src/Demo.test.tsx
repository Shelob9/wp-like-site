import { render } from '@testing-library/react';
import { Demo } from './Demo';
import ReactDOM from 'react-dom';
describe('Demo of hook', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Demo />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
