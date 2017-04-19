import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import configureStore from './store/configureStore';
import TraderDesktopComponent from './components/TraderDesktop/TraderDesktop.component'
import App from './components/app';
import {LoginComponent} from './components/Login/Login.component';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export const store = configureStore();
console.log('sdd')
render(
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={LoginComponent}/>
                <Route path="/trader" component={TraderDesktopComponent}></Route>
            </Route>
            
    </Router>

    </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
);
