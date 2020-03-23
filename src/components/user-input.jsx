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
    var currentValue = input.value;
    var newValue = "";

    if (visitedNode.length > currentValue.length){
      for (var i = 0; i < currentValue.length - 1; i++) {
        newValue += currentValue[i];
      }
      input.value = newValue;
    }
  }
}

export default UserInput;
