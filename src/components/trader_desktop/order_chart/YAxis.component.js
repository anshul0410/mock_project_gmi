import React from 'react';
var Yaxis = require('react-d3-core').Yaxis;
export default class YAxisComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var chartData = this.props.orders;
        var chartSeries = [{
            "field": "quantity",
            "name": "Executed",
            "color": "#ff8000"
        }]


        var width = 500,

            height = 300,

            margins = { top: 20, right: 50, bottom: 20, left: 50 },

            y = function (d) {

                return d.quantity;
            },

            yDomain = d3.extent(chartData, function (d) {  return y(d); }),

            yRange = [(height - margins.top - margins.bottom), 0];

        var yScale = 'ordinal',

            yLabel = "quantity",
            yLabelPosition = 'right',
            yOrient = "right",
            yTickFormat = d3.format(""),
            yTicks = [10, '.2s'],
            yTickOrient = "left";

        return (
            <svg width={width} height={height}>
                <Yaxis
                    width={width}

                    margins={margins}
                    y={y}

                    chartSeries={chartSeries}

                    yOrient={yOrient}
                    yTicks={yTicks}

                    />
            </svg>



        );
    }
}
