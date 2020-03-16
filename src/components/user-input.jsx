import React, { Component } from 'react';

class UserInput extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="form-group">
                <input
                    type="text"
                    id="word-input"
                    className="form-control"
                    style={{width:210}}
                    onKeyUp={this.props.onKeyUp}/>
            </div>
         );
    }
}
 
export default UserInput;