import React from 'react';
import TraderHeaderComponent from './trader_header/TraderHeader.component';
import TraderTaskbarComponent from './trader_taskbar/TraderTaskbar.component';
import TraderTableComponent from './order_table/TraderTable.component';
//import TraderTableComponent from './order_table/TraderTableComponent'

export default class TraderDesktopComponent extends React.Component {

    constructor(props) {
        super(props);       
    }

    componentDidMount(){
        this.props.fetchOrdersData('http://localhost:8080/orders');
    }



    render() {
        return (
            <div className="headerTrader">
                <TraderHeaderComponent {...this.props} />
                <TraderTaskbarComponent {...this.props} />

            </div>


        )
    }
}