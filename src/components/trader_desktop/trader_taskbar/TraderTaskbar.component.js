import React from 'react';
import TraderTableComponent from '../order_table/TraderTable.component';

export default class TraderTaskbarComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            presentation : 0
        }
    }



    render() {
        
        var p;

        if(this.state.presentation===0){
            p = <TraderTableComponent {...this.props}/>;
        }
        else if(this.state.presentation===1){
            
        }
        else{
            p = <TraderTableComponent {...this.props}/>;
        }
        return (

            <div>
                <nav className="nav nav-pills">
                    <button className="traderButton btn-sm">Trade</button>
                    <button className="traderButton btn-sm">Delete All</button>
                    <button className="traderButton btn-sm">Refresh</button>
                    <span className="pull-right">
                        <button className="navButton btn-xs"><img src={require('./table.png')} alt=""/></button>
                        <button className="navButton btn-xs"><img src={require('./chart.png')} alt=""/></button>    
                    </span>
                </nav>
                {p}
            </div>
        )
    }
}