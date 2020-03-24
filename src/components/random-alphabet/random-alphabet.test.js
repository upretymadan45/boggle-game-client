import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RandomAlphabet from './random-alphabet';

Enzyme.configure({adapter: new Adapter()});

describe('RandomAlphabetComponent',()=>{
    it('should render 16 buttons',()=>{
        const wrapper = mount(<RandomAlphabet />);

        const button = wrapper.find('button');
        
        expect(button.length).toBe(16);
    });

    it('rendered button should only have alphabets',()=>{
        const wrapper = mount(<RandomAlphabet />);

        const button = wrapper.find('button');

        button.forEach((btn)=>{
            const text = btn.text();

            expect(typeof(text)).not.toBe(expect.any(Number))
        })
    })
})