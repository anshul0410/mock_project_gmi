import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import cookie from 'react-cookie';
export default class TraderHeaderComponent extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        // var options=;
        // console.log(this.props, 'pol');
        var Trader= cookie.load('Trader')
        return (
            <div className="headerTrader">
                <header>
                    <nav className="nav nav-pills">
                        <h4 id="headerTitle"><b>Trader Desktop</b>
                        <span className="pull-right" id="signOut"><Link to="/" onClick={()=>{cookie.remove('Trader', { path: '/' });}}>Sign Out    </Link>
                        </span>
                        <span className="pull-right" id="headerUserName">   <b>{Trader.name}</b>
           
                         </span>
                         
           
                        </h4>
                        
                    </nav>
                </header>
            </div>
        )

    }
}