import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import WordList from './word-list';

class Score extends Component {
    constructor(props){
        super(props);
        this.restartGame = this.restartGame.bind(this);
    }
    state = {  }
    render() { 
        let words = this.props.location.state.words
        let totalScore = this.props.location.state.score
        return ( 
            <div className="container">
                <h2>Your total score is : {totalScore}</h2>

                <WordList wordList={words}/><br/>

                <button className="btn btn-primary btn-sm" onClick={this.restartGame}>
                    Play Again
                </button>
            </div>
         );
    }

    restartGame(){
        this.props.history.push("/");
    }
}
 
export default withRouter(Score);