import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import RandomAlphabet from "./random-alphabet";
import UserInput from "./user-input";
import Timer from "./timer";

class BoggleGame extends Component {
  constructor(props) {
    super(props);
    this.timeUp = this.timeUp.bind(this);
  }

  state = {
    gameOver: false
  };
  render() {
    return (
      <div className="row" style={{ marginTop: 50 }}>
        <div className="col-6 offset-sm-4">
          <RandomAlphabet ref="randomAlphabet" />

          <UserInput onKeyUp={this.handleUserInputOnKeyUp} />
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
}

export default withRouter(BoggleGame);
