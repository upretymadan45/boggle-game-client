import React, { Component } from 'react';

const hiddenStyle = {
    display: 'none'
}

const shownStyle ={
    display: 'block'
}

class WordList extends Component {
    state = {  }
    render() { 
        let words = this.props.wordList;
        return (  
            <ul className="list-group" style={words.length==0? hiddenStyle : shownStyle}>
                <li className="list-group-item active">
                    {words.length>1 ? "Words" : "Word"} Found
                </li>
                {words.map((word,i)=>(
                    <li className="list-group-item" key={i}>
                        {word}
                <span className="badge badge-warning m-2">Score = {word.length}</span>
                    </li>
                ))}
            </ul>
        );
    }
}
 
export default WordList;