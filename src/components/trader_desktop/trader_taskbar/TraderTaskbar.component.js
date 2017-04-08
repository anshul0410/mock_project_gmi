import React from 'react';
import ReactDOM from 'react-dom';
import TraderTableComponent from '../order_table/TraderTable.component';
import Modal from './TraderModal';

import {modal} from 'react-redux-modal' ;
import ReduxModal from 'react-redux-modal';


export default class TraderTaskbarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            presentation: 0
        }
        this.refreshTrader = this.refreshTrader.bind(this);
        this.deleteAllTrader = this.deleteAllTrader.bind(this);
        this.randomize = this.randomize.bind(this);
        console.log('Taskbar props - ' ,this.props.users);
    }

    componentDidMount(){
        this.props.fetchUsersData('http://localhost:8080/users');
        this.props.fetchInstrumentsData('http://localhost:8080/instruments')
    }

    addModal(method) {
      modal.add(Modal, {
        randomize : method,
        title: 'Create Multiple Trades',
        size: 'medium', // large, medium or small,
        closeOnOutsideClick: false, // (optional) Switch to true if you want to close the modal by clicking outside of it,
        hideTitleBar: false, // (optional) Switch to true if do not want the default title bar and close button,
        hideCloseButton: false // (optional) if you don't wanna show the top right close button
        //.. all what you put in here you will get access in the modal props ;)
        });
    }

    refreshTrader() {
        console.log('refresh', this.props);
        this.props.fetchOrdersData('http://localhost:8080/orders', 'get');
    }

    deleteAllTrader() {
        console.log('delete');
        this.props.fetchOrdersData('http://localhost:8080/orders', 'del');
        //   this.props.fetchOrdersData('http://localhost:8080/orders','get');
    }

    // TradeHandler() {
    //     console.log('Makichut')
    //     const BasicDialog = () => (
    //         <div>
    //             My awesome modalbox!
    //         </div>
    //     )
    //     Dialog = reduxDialog({
    //         name: 'signupDialog' // unique name - you can't have two dialogs with the same name 
    //     })(BasicDialog);
       
    //    this.props.openDialog('signupDialog')
        
    // }

    randomize(no){
        console.log('Inside randomize',no);
        var instruments = this.props.instruments;
        var side = ['Buy','Sell'];
        var traders = this.props.users;

        for(let i = 0 ; i < no ; i++){
            var inindex = Math.floor(Math.random() * 30);
            var selectedInstrument = instruments[inindex];

            var sideindex = Math.floor(Math.random() * 2);
            var selectedSide = side[sideindex];

            var traderindex = Math.floor(Math.random() * 30);
            var selectedTraderId = traders[traderindex].id;

            var quantity = Math.floor(Math.random() * 1000) + 1;

            var limitPrice = Math.floor(selectedInstrument.lastTrade);
            

            var data = {
                side : selectedSide,
                symbol : selectedInstrument.symbol,
                quantity : quantity,
                limitPrice : limitPrice,
                traderId : selectedTraderId
            }

            console.log('Random Generated Obj - ',data);

            this.props.fetchOrdersData('http://localhost:8080/orders','post',data);
        }
    }

    render() {
        var p;

        if (this.state.presentation === 0) {
            p = <TraderTableComponent {...this.props} />;
        }
        else if (this.state.presentation === 1) {

        }
        else {
            p = <TraderTableComponent {...this.props} />;
        }
        return (

            <div>
            <ReduxModal />
                <nav className="nav nav-pills">
                    <button onClick={this.addModal.bind(this,this.randomize)} className="traderButton btn-sm" >Trade</button>
                    <button className="traderButton btn-sm" onClick={this.deleteAllTrader}>Delete All</button>
                    <button className="traderButton btn-sm" onClick={this.refreshTrader}>Refresh</button>
                    <span className="pull-right">
                        <button className="navButton btn-xs"><img  src={require('./table.png')}  alt="" /></button>
                        <button className="navButton btn-xs"><img  src={require('./chart.png')}  alt="" /></button>
                    </span>
                </nav>
                
                {p}
            </div>
        )
    }
}