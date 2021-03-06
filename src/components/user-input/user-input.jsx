import React, { Component } from "react";

class UserInput extends Component {
  state = {}
  render() {
    return (
      <div className="form-group">
        <input
          type="text"
          id="word-input"
          className="form-control"
          style={{ width: 210 }}
          onInput={this.props.onInput}
          onKeyUp={this.props.onKeyUp}
        />
      </div>
    );
  }

  handleError = visitedNode => {
    var input = document.getElementById("word-input");
    var lastText = input.value[input.value.length-1];
    console.log(lastText)
  }
}

export default UserInput;
