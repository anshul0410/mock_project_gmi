import React from 'react';
import YAxisComponent from './YAxis.component';
var Legend = require('react-d3-core').Legend;

var Yaxis = require('react-d3-core').Yaxis; 
var BarStackHorizontalChart = require('react-d3-basic').BarStackHorizontalChart;
export default class TraderChartComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var orderData = [];
        var height = 50;
        if (this.props.orders) {
            //console.log(this.props,'props orders');
            this.props.orders.map((item, index) => {
                var id = item.id;
                var id = item.id;
                var qplaced = item.quantityPlaced - item.quantityExecuted;
                var quantityExecuted = (item.quantityExecuted / item.quantity);
                var quantityPlaced = (qplaced / item.quantity);
                var quantity = 1 - quantityExecuted - quantityPlaced;
                orderData.push({ id, quantityExecuted, quantityPlaced, quantity });
                //console.log(quantityExecuted + " " + quantityPlaced + " " + quantity);
                height += 49;
            });

        } else if (!this.props.orders) {

        }
        //console.log(orderData, 'anshul');


        var width = 700;


        var y = function (d) {
            // console.log(d, 'inside y');
            return d.id
        }
        var x = function (d) {
            // console.log(d,'inside x');

            return +d;
        }
        var chartSeries = [{
            "field": "quantityExecuted",
            "name": "Executed",
            "color": "#ff8000"
        },
        {
            "field": "quantityPlaced",
            "name": "Placed",
            "color": "#febb68"
        },
        {
            "field": "quantity",
            "name": "quantity",
            "color": "#ffefbf"
        },



        ],
            //  yScale = 'ordinal',
            xLabel = "Order Execution Status",
            // xTickFormat = d3.format("%"),
            // yLabel = "Frequency",
            showXGrid = false,
            // showYGrid = false,
            // // xAxistickValues=d3.range(20, 80, 4),
            // xDomain = d3.extent(orderData, function(d){ return x(d.quantity)}),
            // yTicks = [100, "%"],
            // xRange = [0, xDomain],
            xTicks = [, "%"],
            legendClassName = "test-legend-class",
            legendPosition = 'left',
            legendOffset = 1000,
            yScale = "ordinal",
            yLabel = 'Order Id',
            margins = { top: 40, right: 50, bottom: 40, left: 50 },
            showYGrid = false,
            xOrient = 'top',
            xTickOrient = 'top',
            showLegend=false,
            xTickFormat = d3.format("%")
        // y1 = function(d) {
        //     console.log(d.quantity, 'y1');
        //     return d.quantity;
        // }
        var quantity1 = [];
        
        var i=0;
        for(let i=this.props.orders.length-1; i>=0; i--){
            quantity1.push(
                <div className='quantityDiv'>{this.props.orders[i].quantity}</div>
            )
        }
        return (
            <div className="row chartDiv">
                <h4 className="text-center">Order Execution Status</h4>
                <div className="col-xs-8 ">
                    <div className = "col-xs-10">
                    <BarStackHorizontalChart
                        showXGrid={showXGrid}
                        width={800}
                        xTicks={xTicks}
                        title='Order Execution Status'
                        data={orderData}
                        chartSeries={chartSeries}
                        height={height}
                        showYGrid={showYGrid}
                        showLegend={showLegend}
                        yScale={yScale}
                        yLabel={yLabel}
                        y={y}
                        x={x}
                        xTickFormat={xTickFormat}
                   />
                       
                        
                        </div>
                        <div className="col-xs-2 ">
                            {quantity1}
                     
                        </div>
                </div>
                
                <div className="col-xs-offset-1 col-xs-2 pull-left legendDiv">
                    <Legend
                        width={100}
                        height={50}
                        margins={margins}
                        legendClassName={legendClassName}
                        legendPosition={legendPosition}
                        legendOffset={legendOffset}
                        chartSeries={chartSeries}
                        />
                </div>
            </div>
        );

    }
}