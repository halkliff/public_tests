import React from 'react';
import { shallow } from 'enzyme';
import FormLabel from '..';

describe('<FormLabel /> tests', () => {
  it('Should render the component without errors', () => {
    const wrapper = shallow(<FormLabel />);
    expect(wrapper).toExist();
  });
});
