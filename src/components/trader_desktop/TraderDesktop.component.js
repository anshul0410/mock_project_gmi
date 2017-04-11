import React from 'react';
import TraderHeaderComponent from './trader_header/TraderHeader.component';
import TraderTaskbarComponent from './trader_taskbar/TraderTaskbar.component';
import TraderTableComponent from './order_table/TraderTable.component';


//import TraderTableComponent from './order_table/TraderTableComponent'
import cookie from 'react-cookie';
import {Link} from 'react-router';

export default class TraderDesktopComponent extends React.Component {

    constructor(props) {
        super(props);       
    }

    componentDidMount(){
        this.props.fetchOrdersData('http://localhost:8080/orders','get');
    }



    render() {
        if(cookie.load('Trader')){

            return (
                <div className="traderDesktop row">
                    <TraderHeaderComponent {...this.props} />
                    <TraderTaskbarComponent {...this.props} />

                </div>


            )
        }

        else{
            return(
                <div>
                    <h1> <span className="text-danger">You are not signed in !</span> <span className="text-success"> Please sign in </span></h1>
                    <Link to="/">
                    <button id="loginButton" className="btn">Login</button>
                    </Link>
                </div>
            )
        }
    }
}