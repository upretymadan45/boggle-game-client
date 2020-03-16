import React, { Component } from 'react';
import RandomAlphabet from './random-alphabet';
import UserInput from './user-input';

class BoggleGame extends Component {
    state = {  }
    render() { 
        return ( 
        <div className="row" style={{marginTop: 50}}>
            <div className="col-6 offset-sm-4">
                <RandomAlphabet/>

                <UserInput/>
            </div>
        </div>
         );
    }
}
 
export default BoggleGame;