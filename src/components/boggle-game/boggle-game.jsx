import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import RandomAlphabet from "../random-alphabet/random-alphabet";
import UserInput from "../user-input/user-input";
import Timer from "../timer/timer";
import WordList from '../word-list/word-list';

class BoggleGame extends Component {
  constructor(props) {
    super(props);
    this.timeUp = this.timeUp.bind(this);
  }

  state = {
    gameOver: false,
    validWords:[],
    totalScore: 0,
    isError: false
  };

  render() {
    return (
      <div className="row" style={{ marginTop: 50 }}>
        <div className="col-6 offset-sm-4">
          <RandomAlphabet 
          ref="randomAlphabet" 
          onSendValidWord={this.getValidWord}
          onError={this.handleError}/>

          <UserInput
          ref="userInput" 
          onInput={this.handleUserInputonInput} 
          onKeyUp={this.handleEnterAndDelete} />

          <WordList wordList={this.state.validWords}/>
        </div>
        <div className="col-2">
          <Timer onTimeUp={this.timeUp} />
        </div>
      </div>
    );
  }

  handleUserInputonInput = event => {
    let inputValue = event.target.value.toUpperCase();

    let lastLetter = inputValue[inputValue.length - 1];

    this.refs.randomAlphabet.findCorrectWord(lastLetter,inputValue);
  };

  handleEnterAndDelete = event =>{
    if(event.keyCode===8)
      this.refs.randomAlphabet.deleteOnBackspace(event);
      
    if(event.keyCode===13){
      this.refs.randomAlphabet.verifyWord(event,event.target.value);
    }
  }

  timeUp() {
    this.setState({ gameOver: true });
    this.props.history.push("/score",{
      score: this.state.totalScore,
      words: this.state.validWords
    });
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

  handleError = (isError,visitedNode) =>{
    this.setState(()=>({isError: isError}));
    if(isError)
      this.refs.userInput.handleError(visitedNode);
  }
}

export default withRouter(BoggleGame);
