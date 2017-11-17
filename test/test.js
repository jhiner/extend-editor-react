import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
// import { spy } from 'sinon';

process.env.NODE_ENV = 'test';

const ExtendEditor = require('../src/index.js');
const Loader = require('../src/components/loader');

// spy(Foo.prototype, 'componentDidMount');

describe('<ExtendEditor />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<ExtendEditor />);

    expect(Foo.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
