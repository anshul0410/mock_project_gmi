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
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import * as colors from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
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
        this.notificationBadge = 0;
    }

     handleData(data) {
       
        if (data[0] == "4" && data[1] == "2") {

            data = JSON.parse(data.substring(2, ));
            
            this.props.pushNotification(data[0], data[1]);
            // console.log(data[0]);   
            console.log(data,'search delete condition');
            // NotificationManager.info(data[1].status+ 'Order Id '+data[1].orderId +' is initiated '  ,'Trade Status',2500 );
           
            var date=new Date();
            if(data[0]=='allOrdersDeletedEvent' ){
                NotificationManager.error('All Items deleted','Trade Status' ,2500 );
            }
            if(data[0]=='placementCreatedEvent' ){
                // if(data[1].status=='New'){
                // NotificationManager.info(data[1].status+ 'Order Id '+data[1].orderId +' is initiated '  ,'Trade Status',2500 );
                // }
            // console.log(date.getDate(),'date is here');
                
                 var str=(<p style={{color:"rgba(34, 247, 0, 0.86)"}}>  {date.toLocaleString()} <br/> Quantity {data[1].quantityPlaced} of Order Id {data[1].orderId} is Placed  </p>);

                 //var str='Quantity ' + data[1].quantityPlaced +' of Order Id '+data[1].orderId +' is Placed ' + date.toLocaleString() ;
                 //var p = (<p>Hello {data[1].orderId}<br /> {data[1].status}</p>)
                this.menuItems.push(<MenuItem >{str}</MenuItem>);
                if(data[1].status=='Placed' ){
            // console.log(date.getDate(),'date is here inside if');
                    
                 NotificationManager.info('Order Id '+data[1].orderId +' is fully ' + data[1].status,'Trade Status',2500 );
                 var str2 = (<p style={{color:"rgba(34, 247, 0, 0.86)"}}>{date.toLocaleString()} <br/> Order Id {data[1].orderId} is fully {data[1].status}</p>);
                 this.menuItems.push(<MenuItem >{str2}</MenuItem>)
                }
            }
             if(data[0]=='executionCreatedEvent'){
                 var str=(<p style={{color:"rgba(34, 247, 0, 0.86)"}}> {date.toLocaleString()} <br/> Quantity {data[1].quantityExecuted} of Order Id {data[1].orderId} is Executed  </p>);
                this.menuItems.push(<MenuItem >{str}</MenuItem>);
                if(data[1].status=='Executed'){
                 NotificationManager.success('Order Id '+data[1].orderId +' is fully ' + data[1].status,'Trade Status',2500);
                 
                 console.log(date.getDate())
                 var str2 = (<p style={{color:"rgba(34, 247, 0, 0.86)"}}> {date.toLocaleString()} <br/> Order Id {data[1].orderId} is fully {data[1].status} </p>);
                 this.menuItems.push(<MenuItem >{str2}</MenuItem>)
                }
            }
        }
    }

      handleOpen() {
        // console.log('insede handle OPEN');
        // console.log(this.state.open)
        this.setState({open: !this.state.open});
        // console.log(this.state.open)
        
    }

    handleClose() {
        console.log('inside handle close');
     this.setState({open: false});
     this.notificationBadge = 0;
     
    //  console.log('inside if ')
     this.menuItems=[]
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
            
            backgroundColor:colors.grey300
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
                    <Drawer className="drawer" docked={false} width={375} open={this.state.open} onRequestChange={this.handleClose}  >
                        <MenuItem style={styleCancel} onClick={this.handleClose} className="pull-right"> X</MenuItem>
                            
                        <MenuItem  style={styleClose} onClick={this.handleClose}>Close</MenuItem>
                            
                         {this.menuItems}
                   </Drawer>

                <Websocket url='ws://localhost:8080/socket.io/?transport=websocket'
                    onMessage={this.handleData}  reconnect={true}/>
                    <NotificationContainer/>

                </header>
            </div>
        )
    }
}