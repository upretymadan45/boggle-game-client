import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import BoggleGame from './boggle-game';
import Score from './score';

function MainPage(){
    return(
        <Router>
            <div>
                <Route exact path="/" component={BoggleGame}/>
                <Route path="/score" component={Score}/>
            </div>
        </Router>
    );
}

export default MainPage;