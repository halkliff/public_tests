import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

describe('Application takeoff tests', () => {
  it('Should render the application without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toBeDefined();
  });
});
