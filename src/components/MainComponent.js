import React from 'react';

 export default class MainComponent extends React.Component{
render(){

     return (
        <div className="container-fluid ">
           
            {React.cloneElement(this.props.children,this.props)}
        </div>)
}


 }