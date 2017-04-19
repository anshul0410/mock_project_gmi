import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import * as firebase from 'firebase';
import Websocket from 'react-websocket';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import MenuItem from 'material-ui/MenuItem';
import * as colors from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import Drawer from './Drawer.component'


export default class TraderHeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
        this.state={
            open:false
        }
         this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleData=this.handleData.bind(this);
        this.menuItems=[];
        this.menuObject = [];
        this.allNotifications = [];
        this.notificationBadge = 0;
        this.handlePlacedData=this.handlePlacedData.bind(this);
        this.handleExecutedData=this.handleExecutedData.bind(this);
       
        
    }


    handlePlacedData(dataPlaced){
   
            var date= new Date();
            var d ;
                d= dataPlaced;
                 if(d.quantityPlaced>=8 || d.status=='Placed'){
               
                
                d.time = date.toLocaleString().toString();
                d.completion = '';
                d.s = 'Placed';
                d.quantityPlaced = dataPlaced.quantityPlaced.toString();
                d.quantityExecuted = '';
                d.orderId = dataPlaced.orderId.toString();
                var str=(<p style={{color:"rgba(34, 247, 0, 0.86)"}}> {date.toLocaleString()} <br/> Quantity {dataPlaced.quantityPlaced} of Order Id {dataPlaced.orderId} is Placed </p>);
                d.MenuItem = <MenuItem>{str}</MenuItem>
                
                this.menuItems.push(<MenuItem >{str}</MenuItem>);
                this.allNotifications.push(<MenuItem >{str}</MenuItem>);
                
                this.menuObject.push(d);
                if(dataPlaced.status=='Placed'){

                
                    var str2 = (<p style={{color:"rgba(34, 247, 0, 0.86)"}}>{date.toLocaleString()} <br/> Order Id {dataPlaced.orderId} is fully {dataPlaced.status}</p>);
                    
                    this.menuItems.push(<MenuItem >{str2}</MenuItem>)
                    this.allNotifications.push(<MenuItem >{str2}</MenuItem>);
                    d.MenuItem = <MenuItem>{str2}</MenuItem>
                    d.completion = 'fully';
                    this.menuObject.push(d);
                }
                 }
    }
    handleExecutedData(dataExecuted){
        var date= new Date();
        
         var d ;
                d= dataExecuted;
         //console.log(d,' inside handle execution');
                if(d.quantityExecuted>=8 || d.status=='Executed'){
                   
                d.time = date.toLocaleString().toString();
                d.completion = '';
                d.s = 'Executed';
                d.quantityExecuted = dataExecuted.quantityExecuted.toString();
                d.quantityPlaced = '';
                d.orderId = dataExecuted.orderId.toString();
                
                var str=(<p style={{color:"rgba(34, 247, 0, 0.86)"}}> {date.toLocaleString()} <br/> Quantity {dataExecuted.quantityExecuted} of Order Id {dataExecuted.orderId} is Executed </p>);
                
                this.menuItems.push(<MenuItem >{str}</MenuItem>);
                this.allNotifications.push(<MenuItem >{str}</MenuItem>);
                d.MenuItem = <MenuItem >{str}</MenuItem>;
                
                this.menuObject.push(d);
                if(dataExecuted.status=='Executed'){
                    NotificationManager.success('Order Id '+dataExecuted.orderId +' is fully ' + dataExecuted.status,'Trade Status',1500);
                    var str2 = (<p style={{color:"rgba(34, 247, 0, 0.86)"}}> {date.toLocaleString()} <br/> Order Id {dataExecuted.orderId} is fully {dataExecuted.status} </p>);
                    
                    this.menuItems.push(<MenuItem >{str2}</MenuItem>)
                    this.allNotifications.push(<MenuItem >{str2}</MenuItem>);
                    d.MenuItem = <MenuItem >{str2}</MenuItem>;
                    d.completion = 'fully';
                    this.menuObject.push(d);
                 }
                }
    }
     handleData(data) {
       
        if (data[0] == "4" && data[1] == "2") {

            data = JSON.parse(data.substring(2, ));
            
            this.props.pushNotification(data[0], data[1]);
          
            if(data[0]=='allOrdersDeletedEvent' ){
                NotificationManager.error('All Items deleted','Trade Status' ,1500 );
            }
            if(data[0]=='placementCreatedEvent'){
                
                this.handlePlacedData(data[1]);
            }
            
             if(data[0]=='executionCreatedEvent'){
                 this.handleExecutedData(data[1]);
                }
            }

        }
    

      handleOpen() {
      
        this.setState({open: !this.state.open});
        
        
    }

    handleClose() {
       
     this.setState({open: false});
     this.notificationBadge = 0;
     
    
     this.menuItems=[];
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
        var styleBadge={
            top:-25,
            right:0,
            
        }
        var styleNotification={
            margin:-6,
            marginTop:-10,
            height:20,
            width:25,
            padding:8
        }
        var styleClose={
            width:325,
            backgroundColor:colors.red400
        }
        var styleCancel={
            
            backgroundColor:'rgba(255,255,255,0)'
        }

        this.notificationBadge = this.menuItems.length;
        
        return (
            <div className="headerTrader col-xs-12">
                <header>
                    <nav className="nav nav-pills">
                        <h4 id="headerRow" className="col-xs-12 "><b className="headerTitle">Trader Desktop</b>
                            <span className="pull-right " id="signOut"><a href="" onClick={this.signOut}>Sign Out </a>
                            </span>
                            <span className="pull-right" > <b id="headerUserName">{Trader.name}</b>
                            </span>
                            <span className="pull-right notificationBadge" >
                            <Badge style={styleBadge}
                                badgeContent={ this.notificationBadge}
                                secondary={true}
                                badgeStyle={{top: 15, right: 2}}
                            >
                            <IconButton tooltip="Notifications" style={styleNotification} onClick={this.handleOpen}>
                                <NotificationsIcon />
                            </IconButton>
                            </Badge>
                         </span>
    
                        </h4>
                    </nav>
                   
                   <Drawer open={this.state.open} allNotifications={this.allNotifications} handleClose={this.handleClose} menuObject={this.menuObject}></Drawer>

                <Websocket url='ws://localhost:8080/socket.io/?transport=websocket'
                    onMessage={this.handleData}  reconnect={true}/>
                    <NotificationContainer/>

                </header>
            </div>
        )
    }
}