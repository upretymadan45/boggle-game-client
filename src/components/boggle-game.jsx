import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import RandomAlphabet from "./random-alphabet";
import UserInput from "./user-input";
import Timer from "./timer";
import WordList from './word-list';

class BoggleGame extends Component {
  constructor(props) {
    super(props);
    this.timeUp = this.timeUp.bind(this);
  }

  state = {
    gameOver: false,
    validWords:[],
    totalScore: 0
  };

  render() {
    return (
      <div className="row" style={{ marginTop: 50 }}>
        <div className="col-6 offset-sm-4">
          <RandomAlphabet 
          ref="randomAlphabet" 
          onSendValidWord={this.getValidWord}/>

          <UserInput onKeyUp={this.handleUserInputOnKeyUp} />

          <WordList wordList={this.state.validWord}/>
        </div>
        <div className="col-2">
          <Timer onTimeUp={this.timeUp} />
        </div>
      </div>
    );
  }

  handleUserInputOnKeyUp = event => {
    let inputValue = event.target.value.toUpperCase();

    let lastLetter = inputValue[inputValue.length - 1];

    this.refs.randomAlphabet.findCorrectWord(lastLetter, event);
  };

  timeUp() {
    this.setState({ gameOver: true });
    this.props.history.push("/score");
  }

  getValidWord = word =>{
    const{validWords} = this.state;

    if(word.length>0 && !validWords.includes(word.toUpperCase())){
      this.setState(state=>{
        const validWord = state.validWords.push(word.toUpperCase());
        return validWord;
      });

      let totalScore = this.state.totalScore + word.length;
      this.setState({totalScore: totalScore});
    }else{
      let message = validWords.includes(word.toUpperCase())? "Word already guessed!" : "Empty Word!";
      alert(message);
    }
  }
}

export default withRouter(BoggleGame);
