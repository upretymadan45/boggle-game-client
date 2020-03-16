import React, { Component } from 'react';

class Timer extends Component {
    state = { 
        second: 59,
        minute: 2
     }
    render() { 
        let displayMinute = this.state.minute-1;
        let timeText = this.state.second>=10? displayMinute+":"+this.state.second : displayMinute+':0'+this.state.second;
        return ( 
            <h3>
                Time Left{" "}
                <span className="badge badge-success">
                    {timeText}
                </span>
            </h3>
         );
    }
}
 
export default Timer;