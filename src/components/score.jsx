import React, { Component } from 'react';

class Score extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <h2>Your score is : 50</h2>

                <button className="btn btn-primary btn-sm">
                    Play Again
                </button>
            </div>
         );
    }
}
 
export default Score;