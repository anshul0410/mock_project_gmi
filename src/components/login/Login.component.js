import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import cookie from 'react-cookie';
export class LoginComponent extends React.Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        this.props.fetchUsersData('http://mockproject.duckdns.org:8080/users');
    }
     userLoginFunction(){
            var name=ReactDOM.findDOMNode(this.refs.userSelect).value;
            var selected;
            for (let user of this.props.users){
                if(user.name === name){
                    selected= user;
                }
            } 
          
            cookie.save('Trader',selected, { path: '/' });
            this.props.loginUser(selected);
    }
    render(){
       
          
        var options= this.props.users.map((user)=> {
            return <option value={user.name} key={user.id}>{user.name}</option>

        });
      
       
        return (
            <div className="container  row" >
                <div>
                    <h1 className=""><b>Log In</b></h1>
                    <div className="col-xs-10 col-sm-4">
                    <select ref="userSelect" className="form-control col-xs-3">
                     {options}
                    </select>
                    </div>
                </div>
                <div className="col-xs-12" style={{marginTop:'10px'}}>
                    <Link to="/trader" >
                        <button type="button" id="loginButton" className="btn" onClick={this.userLoginFunction.bind(this)} >Login</button>
                    </Link>
                </div>  
          </div>
        );
    }
}