/**
 * Created by Gene on 16/3/14.
 */


import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route } from 'react-router';
import { createHashHistory } from 'history';

const history = createHashHistory();

import AppComponent from './app.component';


ReactDOM.render((

    <Router history={history}>
        <switch>
            <Route path="/" component={AppComponent}/>
        </switch>
    </Router>
), document.getElementById('container'));
