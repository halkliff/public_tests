import React from 'react';
import { shallow } from 'enzyme';
import FormGridSection from '..';

describe('<FormGridSection /> tests', () => {
  it('Should render the component without errors', () => {
    const wrapper = shallow(<FormGridSection />);
    expect(wrapper).toExist();
  });
});
