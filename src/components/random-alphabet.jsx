import React, { Component } from 'react';

class RandomAlphabet extends Component {
    state = { 
        characters: "EARIONTNSLC",
        charArray:[]
     }
    render() { 
        return ( 
            <h2>Random alphabet component</h2>
         );
    }

    componentDidMount(){
        this.getRandomAlphabets();
        console.log(this.state.charArray);
    }

    getRandomAlphabets(){
        const {characters} = this.state;

        var wordArray = new Array(4);
        for(var i=0; i<4; i++){
            wordArray[i]=new Array(4);
        }

        var word = "";

        for(var i=0; i<=15; i++){
            var charPos = Math.floor(Math.random() * characters.length);
            word += characters.charAt(charPos);
        }

        var l = 0;

        for(var j=0; j<4; j++){
            for(var k=0; k<4; k++){
                wordArray[j][k] = word[l];
                l++;
            }
        }

        this.setState(state=>{
            const charArray = state.charArray.push(wordArray);

            return charArray;
        });
    }
}
 
export default RandomAlphabet;