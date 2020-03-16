import React, { Component } from 'react';
import RandomAlphabet from './random-alphabet';
import UserInput from './user-input';
import Timer from './timer';

class BoggleGame extends Component {

    state = { }
    render() { 
        return ( 
        <div className="row" style={{marginTop: 50}}>
            <div className="col-6 offset-sm-4">
                <RandomAlphabet/>

                <UserInput onKeyUp={this.handleUserInputOnKeyUp}/>

            </div>
            <div className="col-2">
                <Timer onTimeUp={this.timeUp}/>
            </div>
        </div>
         );
    }

    handleUserInputOnKeyUp=(event)=>{
        let inputValue = event.target.value.toUpperCase();
        console.log(inputValue);
    }

    timeUp(){
        console.log('Time expired');
    }
}
 
export default BoggleGame;