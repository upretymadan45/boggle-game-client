import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Timer from './timer';

Enzyme.configure({adapter: new Adapter()});

describe('TimerComponent',()=>{
    it('should show text',()=>{
        const wrapper = shallow(<Timer />);
        const text = wrapper.find('h3');
        expect(text.text()).toBe('Time Left 1:59')
    });
});