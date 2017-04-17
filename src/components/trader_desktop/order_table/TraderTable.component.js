import React from 'react';
import TraderHeaderComponent from '../trader_header/TraderHeader.component';
import TraderTaskbarComponent from '../trader_taskbar/TraderTaskbar.component'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
export default class TraderTableComponent extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        var products = [{
            id: 1,
            name: "Item name 1",
            price: 100
        }, {
            id: 2,
            name: "Item name 2",
            price: 100
        }];
    

        var orders = this.props.orders;
        return (
            <div className="traderTable">
                <div className="visible-md visible-lg">
                
                <BootstrapTable  className="table table-default" data={orders} striped={true} condensed >
                    <TableHeaderColumn className="tableHeader" dataField="id" isKey={true} dataAlign="center" dataSort={true}>id</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="creationTime" dataAlign="center"  dataSort={true}>creation Time</TableHeaderColumn>
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
            
                    <BootstrapTable className="table table-default"  data={orders} striped={true} condensed >
                        <TableHeaderColumn className="tableHeader" dataField="id" isKey={true} dataAlign="center" dataSort={true}>id</TableHeaderColumn>
                        <TableHeaderColumn className="tableHeader" dataField="side" dataAlign="center" >Side</TableHeaderColumn>
                        <TableHeaderColumn className="tableHeader" dataField="symbol" dataAlign="center"> Symbol</TableHeaderColumn>
                        <TableHeaderColumn className="tableHeader " dataField="quantity" dataAlign="center" dataSort={true}>Quantity</TableHeaderColumn>
                        <TableHeaderColumn className="tableHeader" dataField="limitPrice" dataAlign="center" dataSort={true}>Limit Price</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            
                <div className="visible-sm ">
            
                    <BootstrapTable className="table table-default"  data={orders} striped={true} condensed >
                    <TableHeaderColumn className="tableHeader" dataField="id" isKey={true} dataAlign="center" dataSort={true}>id</TableHeaderColumn>
                    <TableHeaderColumn className="tableHeader" dataField="creationTime" dataAlign="center"  dataSort={true}>creation Time</TableHeaderColumn>
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