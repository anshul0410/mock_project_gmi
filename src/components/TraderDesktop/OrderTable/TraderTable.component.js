import React from 'react';
// import TraderHeaderComponent from '../TraderHeader/TraderHeader.component';
import TraderTaskbarComponent from '../TraderTaskbar/TraderTaskbar.component'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as colors from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
// import Moment from 'react-moment';

export default class TraderTableComponent extends React.Component {

    constructor(props) {
        super(props);
        this.dateFormat = this.dateFormat.bind(this);
        this.state={
            search:''
        }
    this.searchOrder=this.searchOrder.bind(this);

}
 searchOrder(event){
        this.setState({search:event.target.value});
    }
     dateFormat(input){
        var input2= input.replace('T',' ').replace('Z',).substring(0,19);
        return input2;
    }

    render() {
        
    

        var orders = this.props.orders;
        // var map= new Map();
        // if(orders){
        //     orders.forEach((item)=> {
        //      map.set(item.id,{item.id, item.name})   
        //     });
        // }
          if(this.state.search)
         {
          orders=[];
            this.props.orders.map((item)=>{
          if(item.status.slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.side.slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.creationTime.toString().slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.traderId.slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.symbol.slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.quantity.toString().slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.limitPrice.toString().slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.priority.toString().slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0
            || item.id.toString().slice(0,this.state.search.length).toUpperCase().search(this.state.search.toUpperCase()) >=0)
        orders.push(item);
         })
        }
        var styleSearch={
            inputFieldStyle:{
                marginLeft:10,
                color:colors.blue50
            } ,
            floatingLabelFocusStyle:{color:colors.blue50},
            underlineFocusStyle:{borderColor: colors.blue50}
        }
        return (

            <div className="traderTable">
                 <TextField hintText="search In Table" style={styleSearch.inputFieldStyle}  floatingLabelFocusStyle={styleSearch.floatingLabelFocusStyle} underlineFocusStyle={styleSearch.underlineFocusStyle} onChange={this.searchOrder} floatingLabelText="Search Orders"/><br />
                <div className="visible-md visible-lg">
                
                <BootstrapTable  className="table table-default" data={orders} striped={true} condensed pagination>
                    <TableHeaderColumn className="tableHeader" dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" width="200px" dataField="creationTime" dataFormat={this.dateFormat} dataAlign="center" dataSort={true}>Creation Time</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="side" dataAlign="center" >Side</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="symbol" dataAlign="center"> Symbol</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader " dataField="quantity" dataAlign="center" dataSort={true}>Quantity</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="quantityPlaced" dataAlign="center" dataSort={true}>Placed</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="quantityExecuted" dataAlign="center" dataSort={true}>Executed</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="limitPrice" dataAlign="center" dataSort={true}>Limit Price</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="priority" dataAlign="center" dataSort={true}>Priority</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="status" dataAlign="center" dataSort={true}>Status</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="traderId" dataAlign="center" dataSort={true}>Trader</TableHeaderColumn>
                </BootstrapTable>
            </div>
                <div className="visible-xs">
            
                    <BootstrapTable className="table table-default"  data={orders} striped={true} condensed pagination>
                        <TableHeaderColumn className="tableHeader" dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn className="tableHeader" dataField="side" dataAlign="center" >Side</TableHeaderColumn>
                        <TableHeaderColumn className="tableHeader" dataField="symbol" dataAlign="center"> Symbol</TableHeaderColumn>
                        <TableHeaderColumn className="tableHeader " dataField="quantity" dataAlign="center" dataSort={true}>Quantity</TableHeaderColumn>
                        <TableHeaderColumn className="tableHeader" dataField="limitPrice" dataAlign="center" dataSort={true}>Limit Price</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            
                <div className="visible-sm ">
            
                    <BootstrapTable className="table table-default"  data={orders} striped={true} condensed pagination>
                    <TableHeaderColumn className="tableHeader" dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="creationTime" dataAlign="center"  dataSort={true}>Creation Time</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="side" dataAlign="center" >Side</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="symbol" dataAlign="center"> Symbol</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader " dataField="quantity" dataAlign="center" dataSort={true}>Quantity</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="quantityPlaced" dataAlign="center" dataSort={true}>Placed</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="quantityExecuted" dataAlign="center" dataSort={true}>Executed</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="limitPrice" dataAlign="center" dataSort={true}>Limit Price</TableHeaderColumn>

                    <TableHeaderColumn className="tableHeader" dataField="status" dataAlign="center" dataSort={true}>Status</TableHeaderColumn>
                   
                    </BootstrapTable>
                </div>

            </div>



        )
    }
}