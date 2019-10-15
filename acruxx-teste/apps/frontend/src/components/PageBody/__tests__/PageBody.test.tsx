import React from 'react';
import { shallow } from 'enzyme';
import PageBody from '..';

describe('<PageBody /> tests', () => {
  it('Should render the component without errors', () => {
    const wrapper = shallow(<PageBody />);
    expect(wrapper).toExist();
  });

  it('Should contain the "fixedAppBar" property set to true', () => {
    const wrapper = shallow(<PageBody fixedAppBar />);
    expect(wrapper.prop('fixedAppBar')).toBeTruthy();
  });
});
