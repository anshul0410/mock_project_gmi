import React from 'react';
import ReactDOM from 'react-dom';

import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import * as colors from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';

export default class DrawerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isSearch:false,
            showMenuItems:this.props.allNotifications
        }
        this.searchInNotifications = this.searchInNotifications.bind(this);
    }

    
    searchInNotifications(e){
        this.setState({
            isSearch:true
        })
        //console.log(this.state.searchValue);
        var menuObject = this.props.menuObject;
        //console.log(menuItemsString);
        var x = this.refs.searchValue.getValue();
        //console.log(x,'x - ');
        var y = [];
        for(let mi in menuObject){
            if(menuObject[mi].toLowerCase().indexOf(x) > -1){
                //console.log('found',menuObject[mi],x,menuObject[mi]);
                y.push(this.props.allNotifications[mi]);
            }
        }
        //console.log(y);
        this.setState({
            showMenuItems : y
        });
    }

    render(){
        //console.log('props',this.props);
        var styleClose={
            width:325,
            backgroundColor:colors.red400
        }
        var styleCancel={
            backgroundColor:'rgba(255,255,255,0)'
        }

        var styles = {
            floatingLabelStyle:{

            },
            underlineStyle:{

            }

        }
        
        var allNotificationsdisplay = this.state.showMenuItems.reverse();
        return(
            <Drawer className="drawer" docked={false} width={375} open={this.props.open} onRequestChange={this.props.handleClose}  >
                        <MenuItem style={styleCancel} onClick={this.props.handleClose} className="pull-right "><span className="text-danger"> X</span></MenuItem>
                            
                        <MenuItem  style={styleCancel} onClick={this.props.handleClose}></MenuItem>
                        <TextField
                        floatingLabelText="Search in Notifications"
                        ref="searchValue"
                        onChange={this.searchInNotifications}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        underlineFocusStyle={styles.underlineStyle}
                    />
                        
                            
                         {allNotificationsdisplay}
            </Drawer>
        )
    }
}