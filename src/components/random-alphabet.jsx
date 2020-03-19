import React, { Component } from "react";

class RandomAlphabet extends Component {
  state = {
    characters: "EARIONTNSLC",
    charArray: [],
    visitedNode:[],
    isSuccess: true
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

  findCorrectWord(lastLetter, e) {
    const{visitedNode} = this.state;

    let value = e.target.value.toUpperCase();

    var visitedNodeArray = new Array();

    var targets, rowId, colId;

    targets = [...document.querySelectorAll("button")].filter(x =>
      x.textContent.includes(lastLetter)
    );
    
    if(visitedNode.length===0){
      this.storeFirstTypedCharToArray(targets,visitedNodeArray);
    }

    var lastVisitedNode = 
        visitedNode.length>0 &&
        visitedNode[visitedNode.length-1];

    
    
  }

  storeFirstTypedCharToArray(targets,visitedNodeArray){
    for(var i=0; i<targets.length; i++){
      var rowId = targets[i].getAttribute("data-row-id");
      var colId = targets[i].getAttribute("data-col-id");
      visitedNodeArray.push({
        rowId: rowId,
        colId: colId,
        target: targets[i].innerHTML
      });
    }

    var tempJoined = this.state.visitedNode.concat(visitedNodeArray);
    this.setState({visitedNode: tempJoined});
  }

  checkValidityOfNodes(
    targets,rowId,colId,visitedNodeArray,e,i,lastVisitedNode,alreadyExists
  ){
    const{visitedNode} = this.state;
    var checkRowId, checkColId;

    var existingNodesWithSameLetterAsLastVisitedNode = visitedNode?.filter(
      node=>
        node.target ===
        visitedNode[visitedNode.length-1].target
    );

    if(existingNodesWithSameLetterAsLastVisitedNode.length>0){
      for(var j=0; j<existingNodesWithSameLetterAsLastVisitedNode.length; j++){
        checkRowId = Math.abs(colId - existingNodesWithSameLetterAsLastVisitedNode[j].rowId);
        checkColId = Math.abs(colId - existingNodesWithSameLetterAsLastVisitedNode[j].colId);

        if((checkRowId===1 || checkRowId===0) && (checkColId===1 || checkColId===0)){
          break;
        }
      }
    }else{
      checkRowId = Math.abs(rowId - lastVisitedNode.rowId);
      checkColId = Math.abs(colId - lastVisitedNode.colId);
    }

    var isValid = (checkRowId===1 || checkRowId===0 ) && (checkColId ===1 || checkColId===0);

    if(isValid && (e.keyCode !=13 || e.keyCode!=8) && !alreadyExists){
      visitedNodeArray.push({
        rowId: rowId,
        colId: colId,
        target: targets[i].innerHTML
      });
      this.setState({isSuccess: true});
    }else{
      this.setState({isSuccess: false});
    }
  }
}

export default RandomAlphabet;
