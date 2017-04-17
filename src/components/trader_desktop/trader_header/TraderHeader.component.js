import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import * as firebase from 'firebase';

export default class TraderHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        firebase.auth().signOut()
            .then(() => {
                // Sign-out successful.
                cookie.remove('Trader', { path: '/' });
                console.log('signOut successful');
                browserHistory.push('/');
            }).catch((error) => {
                // An error happened.
                alert('signOut unsuccessful due to ' + error);
            });
        
    }

    render() {
        var Trader= cookie.load('Trader');
        return (
            <div className="headerTrader col-xs-12">
                <header>
                    <nav className="nav nav-pills">
                        <h4 id="headerRow" className="col-xs-12 "><b className="headerTitle">Trader Desktop</b>
                            <span className="pull-right " id="signOut"><a href="" onClick={this.signOut}>Sign Out </a>
                            </span>
                            <span className="pull-right" > <b id="headerUserName">{Trader.name}</b>
                            </span>
                        </h4>
                    </nav>
                </header>
            </div>
        )
    }
}