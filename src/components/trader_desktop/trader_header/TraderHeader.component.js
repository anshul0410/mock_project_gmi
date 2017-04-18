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
// import Drawer from 'material-ui/Drawer';
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
        // this.handleNewData=this.handleNewData.bind(this);
        
    }


    // handleNewData(){

    // }

    handlePlacedData(dataPlaced){
        var dataP=dataPlaced;
        var date1=new Date();
        var str=(<p style={{color:"rgba(34, 247, 0, 0.86)"}}>  {date1.toLocaleString()} <br/> Quantity {dataP.quantityPlaced} of Order Id {dataP.orderId} is Placed  </p>);
                this.menuItems.push(<MenuItem >{str}</MenuItem>);
                this.allNotifications.push(<MenuItem >{str}</MenuItem>);

                var strObj='Quantity ' + dataP.quantityPlaced +' of Order Id '+dataP.orderId +' is Placed ' + date1.toLocaleString() ;
                this.menuObject.push(strObj);
         if(dataP.status=='Placed' ){
            
                    
                // NotificationManager.info('Order Id '+dataP.orderId +' is fully ' + dataP.status,'Trade Status',2000 );
                 var str2 = (<p style={{color:"rgba(34, 247, 0, 0.86)"}}>{date1.toLocaleString()} <br/> Order Id {dataP.orderId} is fully {dataP.status}</p>);
                 this.menuItems.push(<MenuItem >{str2}</MenuItem>)
                 this.allNotifications.push(<MenuItem >{str2}</MenuItem>);

                 var strObj2 = 'Order Id '+dataP.orderId +' is fully ' + dataP.status;
                 this.menuObject.push(strObj2);
     }
    }
    handleExecutedData(dataExecuted){
        var dataE= dataExecuted;
        var date2= new Date();
        var str=(<p style={{color:"rgba(34, 247, 0, 0.86)"}}> {date2.toLocaleString()} <br/> Quantity {dataE.quantityExecuted} of Order Id {dataE.orderId} is Executed  </p>);
                this.menuItems.push(<MenuItem >{str}</MenuItem>);
                this.allNotifications.push(<MenuItem >{str}</MenuItem>);

                var strObj='Quantity ' + dataE.quantityExecuted +' of Order Id '+dataE.orderId +' is Executed ' + date2.toLocaleString() ;
                this.menuObject.push(strObj);
                if(dataE.status=='Executed'){
                 NotificationManager.success('Order Id '+dataE.orderId +' is fully ' + dataE.status,'Trade Status',2000);
                 var str2 = (<p style={{color:"rgba(34, 247, 0, 0.86)"}}> {date2.toLocaleString()} <br/> Order Id {dataE.orderId} is fully {dataE.status} </p>);
                 this.menuItems.push(<MenuItem >{str2}</MenuItem>)
                 this.allNotifications.push(<MenuItem >{str2}</MenuItem>);

                 var strObj2 = 'Order Id '+dataE.orderId +' is fully ' + dataE.status;
                 this.menuObject.push(strObj2);
        }
    }
     handleData(data) {
       
        if (data[0] == "4" && data[1] == "2") {

            data = JSON.parse(data.substring(2, ));
            
            this.props.pushNotification(data[0], data[1]);
            // console.log(data[0]);   
            //console.log(data,'search delete condition');
            // NotificationManager.info(data[1].status+ 'Order Id '+data[1].orderId +' is initiated '  ,'Trade Status',2500 );
           
            // var date=new Date();
            if(data[0]=='allOrdersDeletedEvent' ){
                NotificationManager.error('All Items deleted','Trade Status' ,2000 );
            }
            if(data[0]=='placementCreatedEvent' ){
                
                this.handlePlacedData(data[1]);
            }
            
             if(data[0]=='executionCreatedEvent'){
                 this.handleExecutedData(data[1]);
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
       // console.log('inside handle close');
     this.setState({open: false});
     this.notificationBadge = 0;
     
    //  console.log('inside if ')
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
                    {/*<Drawer className="drawer" docked={false} width={375} open={this.state.open} onRequestChange={this.handleClose}  >
                        <MenuItem style={styleCancel} onClick={this.handleClose} className="pull-right"> X</MenuItem>
                        <MenuItem style={styleCancel} onClick={this.handleClose}> </MenuItem>
                        
                            
                        
                            
                         {allNotificationsdisplay}
                   </Drawer>
                   */}
                   <Drawer open={this.state.open} allNotifications={this.allNotifications} handleClose={this.handleClose} menuObject={this.menuObject}></Drawer>

                <Websocket url='ws://localhost:8080/socket.io/?transport=websocket'
                    onMessage={this.handleData}  reconnect={true}/>
                    <NotificationContainer/>

                </header>
            </div>
        )
    }
}