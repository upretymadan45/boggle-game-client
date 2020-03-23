import React, { Component } from "react";

class RandomAlphabet extends Component {
  state = {
    characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    charArray: [],
    visitedNode: [],
    isSuccess: true,
    lastUsedNodeRowId: -1,
    lastUsedNodeColId: -1,
    value:"",
    alreadyExists: false
  };

  render() {
    return this.state.charArray.map((x, i) => (
      <table key={i}>
        <thead></thead>
        <tbody>
          {x.map((y, i) => (
            <tr key={i}>
              {y.map((z, j) => (
                <td key={j}>
                  <button
                    className="btn btn-primary btn-sm letter-btn"
                    data-row-id={i}
                    data-col-id={j}
                  >
                    {z}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    ));
  }

  componentDidMount() {
    this.getRandomAlphabets();
  }

  getRandomAlphabets() {
    const { characters } = this.state;

    var wordArray = this.initialize2dArray();

    var word = this.generateRandomChars(characters);

    this.load2dArrayWithRandomChars(wordArray, word);

    this.setState(state => {
      const charArray = state.charArray.push(wordArray);

      return charArray;
    });
  }

  load2dArrayWithRandomChars(wordArray, word) {
    var l = 0;
    for (var j = 0; j < 4; j++) {
      for (var k = 0; k < 4; k++) {
        wordArray[j][k] = word[l];
        l++;
      }
    }
  }

  generateRandomChars(characters) {
    var word = "";
    for (var i = 0; i <= 15; i++) {
      var charPos = Math.floor(Math.random() * characters.length);
      word += characters.charAt(charPos);
    }
    return word;
  }

  initialize2dArray() {
    var wordArray = new Array(4);
    for (var i = 0; i < 4; i++) {
      wordArray[i] = new Array(4);
    }
    return wordArray;
  }

  findCorrectWord(lastLetter,inputValue) {
    const { visitedNode } = this.state;

    var visitedNodeArray = new Array();

    var targets, rowId, colId;

    targets = [...document.querySelectorAll("button")].filter(
      x =>
        x.textContent.includes(lastLetter) &&
        (x.getAttribute("data-row-id") != this.state.lastUsedNodeRowId ||
          x.getAttribute("data-col-id") != this.state.lastUsedNodeColId)
    );

    if (visitedNode.length === 0) {
      this.storeFirstTypedCharToArray(targets, visitedNodeArray);
      return;
    }

    var lastVisitedNode =
      visitedNode.length > 0 && visitedNode[visitedNode.length - 1];
    
    for (var i = 0; i < targets.length; i++) {
    var rowId = targets[i].getAttribute("data-row-id");
    var colId = targets[i].getAttribute("data-col-id");

    var alreadyExists =
      visitedNode.filter(node => node.rowId === rowId && node.colId === colId)
        .length > 0;

    this.setState(()=>({alreadyExists: alreadyExists}))

    this.checkValidityOfNodes(
      targets[i],
      rowId,
      colId,
      visitedNodeArray,
      lastVisitedNode,
      alreadyExists
    );

    var joined = visitedNode.concat(visitedNodeArray);
    this.setState(() => ({ visitedNode: joined }));
    this.setState(()=>({value: inputValue}));
    }
  }

  storeFirstTypedCharToArray(targets, visitedNodeArray) {
    for (var i = 0; i < targets.length; i++) {
      var rowId = targets[i].getAttribute("data-row-id");
      var colId = targets[i].getAttribute("data-col-id");

      this.setState(() => ({ lastUsedNodeRowId: rowId }));
      this.setState(() => ({ lastUsedNodeColId: colId }));

      visitedNodeArray.push({
        rowId: rowId,
        colId: colId,
        target: targets[i].innerHTML
      });
    }

    var tempJoined = this.state.visitedNode.concat(visitedNodeArray);
    this.setState(() => ({ visitedNode: tempJoined }));
  }

  checkValidityOfNodes(
    targets,
    rowId,
    colId,
    visitedNodeArray,
    lastVisitedNode,
    alreadyExists
  ) {
    const { visitedNode } = this.state;
    var checkRowId, checkColId;

    var existingNodesWithSameLetterAsLastVisitedNode = visitedNode?.filter(
      node => node.target === visitedNode[visitedNode.length - 1].target
    );

    if (existingNodesWithSameLetterAsLastVisitedNode.length > 0) {
      for (
        var j = 0;
        j < existingNodesWithSameLetterAsLastVisitedNode.length;
        j++
      ) {
        checkRowId = Math.abs(
          rowId - existingNodesWithSameLetterAsLastVisitedNode[j].rowId
        );

        checkColId = Math.abs(
          colId - existingNodesWithSameLetterAsLastVisitedNode[j].colId
        );

        if (
          (checkRowId === 1 || checkRowId === 0) &&
          (checkColId === 1 || checkColId === 0)
        ) {
          break;
        }
      }
    } else {
      checkRowId = Math.abs(rowId - lastVisitedNode.rowId);
      checkColId = Math.abs(colId - lastVisitedNode.colId);
    }

    var isValid =
      (checkRowId === 1 || checkRowId === 0) &&
      (checkColId === 1 || checkColId === 0);

    if (isValid && !alreadyExists) {
      visitedNodeArray.push({
        rowId: rowId,
        colId: colId,
        target: targets.innerHTML
      });
      this.setState(() => ({ isSuccess: true }));
      this.setState(() => ({ lastUsedNodeRowId: rowId }));
      this.setState(() => ({ lastUsedNodeColId: colId }));
      this.props.onError(false, this.state.visitedNode);
    } else {
      this.setState(() => ({ isSuccess: false }));
      this.props.onError(true, this.state.visitedNode);
    }
  }

  deleteOnBackspace(e) {
    if (e.keyCode == 8) {
      this.setState(() => ({ visitedNode: [] }));
      e.target.value = "";
      this.setState(() => ({ isSuccess: true }));

      this.setState(()=>({lastUsedNodeColId:-1}));
      this.setState(()=>({lastUsedNodeRowId: -1}))
    }
  }

  verifyWord(e, value) {
    if (e.keyCode == 13) {
      if (this.state.isSuccess) {
        fetch("http://localhost:3000/validate_word?word=" + value)
          .then(res => res.json())
          .then(data => {
            if (data) {
              this.props.onSendValidWord(value);
            } else {
              alert("Word not found in dictionary");
            }
          });
      } else {
        alert("Invalid word combination");
      }
      e.target.value = "";
      this.setState(() => ({ isSuccess: true }));
      this.setState(() => ({ visitedNode: [] }));
    }
  }
}

export default RandomAlphabet;
