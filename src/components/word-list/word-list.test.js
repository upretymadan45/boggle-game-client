import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WordList from './word-list';

Enzyme.configure({adapter: new Adapter()});

describe('WordListComponent',()=>{
    it('should render \'word found\' text when wordList is empty',()=>{
        let props = {
            wordList:[]
        };
        const wrapper = shallow(<WordList wordList={props.wordList}/>);
        const list = wrapper.find('li').first();
        expect(list.text().toLocaleLowerCase()).toBe('word found');
    });

    it('should render 4 li tags when there are 3 words in wordList',()=>{
        let props = {
            wordList:['cow','goat','cat']
        };

        const wrapper = shallow(<WordList wordList={props.wordList}/>);
        const list = wrapper.find('li');
        
        expect(list.length).toBe(4);
    })

    it('should hide when wordList has 0 elements',()=>{
        let props = {
            wordList:[]
        };

        const wrapper = shallow(<WordList wordList={props.wordList}/>);

        const container = wrapper.find(".list-group");

        expect(container.get(0).props.style.display).toBe('none');
    })

    it('should show when wordList has more than 0 elements',()=>{
        let props = {
            wordList:['cat','dog']
        };
        const wrapper = shallow(<WordList wordList={props.wordList}/>);
        const container = wrapper.find(".list-group");
        expect(container.get(0).props.style.display).toBe('block');
    })
});