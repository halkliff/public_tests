import React from 'react';
import { shallow } from 'enzyme';
import PageSection from '..';

describe('<PageSection /> tests', () => {
  it('Should render the component without errors', () => {
    const wrapper = shallow(<PageSection />);
    expect(wrapper).toExist();
  });
});
