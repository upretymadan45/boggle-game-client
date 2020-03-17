import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class Score extends Component {
    constructor(props){
        super(props);
        this.restartGame = this.restartGame.bind(this);
    }
    state = {  }
    render() { 
        return ( 
            <div>
                <h2>Your score is : 50</h2>

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