import React from 'react';
export class LoginComponent extends React.Component{
    constructor(props){
        super(props);

    }
    componentDidMount(){
        this.props.fetchUsersData('http://localhost:8080/users');
    }
    render(){
        // var options=;
        console.log(this.props);
        var options= this.props.users.map((user)=> {
            return <option value={user.name} key={user.id}>{user.name}</option>

        });
       
        return (
            <div className="container" >
                <div >
                    <h1 className=""><b>Log In</b></h1>
                    <select >
                     {options}
                    </select>
                </div>
            <div>
                 <button type="button" id="loginButton" className="">Login</button>
            </div>  
          </div>
        );
    }
}