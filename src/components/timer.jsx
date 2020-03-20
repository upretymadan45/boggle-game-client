import React, { Component } from 'react';

class Timer extends Component {
    _isMounted = false;

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

    componentDidMount(){
        this._isMounted = true;
        if(this._isMounted) this.increaseSecond();
    }

    componentDidUpdate(){
        if(this._isMounted){
            if(this.state.second===-1 && this.state.minute>0){
                this.setState({second: 59});
                this.setState({minute: this.state.minute - 1});
            }

            if(this.state.second===0 && this.state.minute===1){
                this._isMounted = false;
                this.props.onTimeUp();
            }
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    increaseSecond(){
        setInterval(()=>{
            this.setState({second: this.state.second - 1});
        },1000);
    }
}
 
export default Timer;