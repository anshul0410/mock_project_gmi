import React from 'react';
import ReactDOM from 'react-dom';

import {modal} from 'react-redux-modal' ;
import ReduxModal from 'react-redux-modal';


export default class myModalComopnent extends React.Component {
  constructor(props) { 
    super(props);
    // console.log('## MODAL DATA AND PROPS:', this.props);
  }

  removeThisModal() {
    this.props.removeModal();
  }
  createThisModal(){
      var x=ReactDOM.findDOMNode(this.refs.targetvalue).value;
      // console.log(x);

      this.props.randomize(x);
      this.props.removeModal();
      
  }
	
  render() {
    return (
      <div>
        <p>Enter number of trades</p>
        <input type="text" ref="targetvalue"></input>
        <button
          type="button"
          onClick={this.createThisModal.bind(this)} className="pull-right">
          Create
        </button>
        <button
          type="button"
          onClick={this.removeThisModal.bind(this)} className="pull-right">
          Cancel
        </button>
      </div>
    );
  }
}