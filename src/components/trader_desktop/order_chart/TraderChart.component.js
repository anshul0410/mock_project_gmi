import React from 'react';
var BarStackHorizontalChart = require('react-d3-basic').BarStackHorizontalChart;
export default class TraderChartComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var orderData = [];

        if(this.props.orders){
            console.log(this.props,'props orders');
            this.props.orders.map((item, index) => {
            var id = item.id;
            var id = item.id;
            var qplaced = item.quantityPlaced - item.quantityExecuted;
            var quantityExecuted = (item.quantityExecuted / item.quantity);
            var quantityPlaced = (qplaced / item.quantity);
            var quantity = 1 - quantityExecuted - quantityPlaced;
            orderData.push({ id, quantityExecuted, quantityPlaced, quantity });
            //console.log(quantityExecuted + " " + quantityPlaced + " " + quantity);

            });

        }
        else if(!this.props.orders){
            
        }
        //console.log(orderData, 'anshul');


        var width = 700,
            height = 400;

        var y = function (d) {
            // console.log(d, 'inside y');
            return d.id
        }
        var x = function (d) {
            // console.log(d,'inside x');

            return +d;
        }
        var chartSeries = [
            {
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
            xTicks = [2, "%"],
            // legendClassName = "test-legend",
            legendPosition = 'right',
            yScale = "ordinal",
            yLabel = 'Order Id',
            showYGrid = false,
            xOrient = 'top',
            xTickOrient = 'top',
            xTickFormat = d3.format("%"),
            y1 = function (d) {
                console
    .log(d.quantity,'y1');
                return d.quantity;
            }




        return (

            <BarStackHorizontalChart
                //                         title='Order Execution Status'
                //                         data={orderData}
                //                         chartSeries={chartSeries}
                //                         width={750}
                //                         height={400}
                //                         yTicks={yTicks}
                //                         yLabel={yLabel}
                //                         yScale={yScale}
                                         xLabel={xLabel}
                //                         y={y}
                //                         x={x}
                // // xRange={xRange}
                // xDomain={xDomain}
                // // xAxistickValues={xAxistickValues}
                // // xTickFormat={xTickFormat}
                showXGrid={showXGrid}
                // showYGrid={showYGrid}
                xTicks={xTicks}
                title='Order Execution Status'
                data={orderData}
                chartSeries={chartSeries}
                width={750}
                height={350}
                showYGrid={showYGrid}
                // xOrient={xOrient}
                yScale={yScale}
                yLabel={yLabel}
                y={y}
                y1={y1}
                x={x}
                xTickFormat={xTickFormat}
                // legendClassName={legendClassName}
                legendPosition={legendPosition}
                />

        );
    }
}
