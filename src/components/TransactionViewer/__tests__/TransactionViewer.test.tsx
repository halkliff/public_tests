import React from 'react';
import ReactDOM from 'react-dom';
import { create, ReactTestRenderer } from 'react-test-renderer';

// This component is dependent of the redux store, therefore we must have the store
// provider available for the component.

import { Provider } from 'react-redux';
import store from 'store';

import TransactionViewer from '../TransactionViewer';

describe('Selector Component tests', () => {
  it('Renders the component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <TransactionViewer />
      </Provider>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Renders the component correctly', () => {
    const selector: ReactTestRenderer = create(
      <Provider store={store}>
        <TransactionViewer />
      </Provider>
    );
    expect(selector.toJSON()).toMatchSnapshot();
  });
});
