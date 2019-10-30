import { Demo } from './Demo';
import ReactDOM from 'react-dom';
import React from 'react';
import { render } from '@testing-library/react';

describe('Demo of hook', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Demo page={1} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Snapshots ', () => {
    const { container } = render(<Demo page={1} />);
    expect(container).toMatchSnapshot();
  });
});
