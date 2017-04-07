import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
export default class TraderHeaderComponent extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        // var options=;
        console.log(this.props, 'pol');
        return (
            <div className="headerTrader">
                <header>
                    <nav className="nav nav-pills">
                        <h4 id="headerTitle"><b>Trader Desktop</b>
                        <span className="pull-right" id="signOut"><Link to="/">   Sign Out    </Link>
                        </span>
                        <span className="pull-right" id="headerUserName">   <b>{this.props.currentUser.name}</b>
           
                         </span>
                         
           
                        </h4>
                        
                    </nav>
                </header>
            </div>
        )

    }
}