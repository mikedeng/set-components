import { expect } from 'chai';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

global.React = React;
global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;