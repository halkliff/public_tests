import React from 'react';
import ReactDOM from 'react-dom';
import { create, ReactTestRenderer } from 'react-test-renderer';

// This component is dependent of the redux store, therefore we must have the store
// provider available for the component.

import { Provider } from 'react-redux';
import store from 'store';

import Main from '../Main';

describe('Main Page tests', () => {
  it('Renders the page without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Main />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders the page correctly', () => {
    const selector: ReactTestRenderer = create(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(selector.toJSON()).toMatchSnapshot();
  });
});
