import React, { PureComponent } from 'react'
import { ResponsiveLine } from '@nivo/line'

import { CircularProgress } from '@material-ui/core'

import './css/lineChart.css'

import { popupForPerformanceDetail } from './lineCharHelper'
import apiCaller from 'apiCaller'
import { connect } from 'react-redux'

import { fetchPerformanceData } from 'overview/PortFolio/portFolioActions'

class RealTimeChart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            loadSpinner: false,
            baseLineData: undefined,
            stashAwayReturns: undefined,
            marker: undefined,
            selectedCurrency: "SGD",
            currencyFormat: {
                "USD": {
                    locale: 'en-US',
                    currency: 'USD'
                },
                "SGD": {
                    locale: 'en-SG',
                    currency: 'SGD'
                }
            }
        }
    }

    componentWillReceiveProps(nextProps, state) {
        let request = { ...nextProps.performanceData }
        if (request.selectedIndexValue && request.selectedIndexValue !== -1) {
            this.setState({ loadSpinner: true });
            let callBackForResponseLoaded = (response) => {
                let { baseLineData, stashAwayReturns, marker, sourceOfData } = response
                this.setState({ ...nextProps.performanceData, baseLineData, sourceOfData, stashAwayReturns, marker, loadSpinner: false })
            }
            let errorCallBack = () => {
                this.setState({ loadSpinner: false });
            }
            this.fetchPerformanceList(request, callBackForResponseLoaded, errorCallBack);
        }
    }

    async fetchPerformanceList(request, successCallBack, errorCallBack) {
        try {
            let response = await apiCaller.callAPI(fetchPerformanceData, 'POST', request);
            successCallBack(response);
        } catch (err) {
            console.log(err)
            errorCallBack();
        }
    }

    render() {
        if (this.state.loadSpinner) {
            return <div className="progress-container"><CircularProgress className="progress_align" /></div>
        }

        let { dictionary } = window;
        const { baseLineData, stashAwayReturns, marker, selectedIndexName, sourceOfData } = this.state

        let { locale, currency } = this.state.currencyFormat[this.state.selectedCurrency]
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        })

        const chartProperties = getPropertiesForLineChart(baseLineData, dictionary, stashAwayReturns, formatter, marker, selectedIndexName)

        let textforSource = sourceOfData ? (dictionary['static2_text_chart'] + sourceOfData) : "";
        return (
            baseLineData ?
                <div className="container-chart">
                    <div className="p-4 clr-white">
                        <h5>{dictionary['static1_text_chart']}</h5>
                        <i>{textforSource}</i>
                    </div>
                    <ResponsiveLine
                        {...chartProperties}
                        sliceTooltip={(props) => popupForPerformanceDetail(props, formatter, currency)}
                        theme={themeForLineChart}
                    />
                </div>
                :
                <div />
        )
    }
}

let getPropertiesForLineChart = (baseLineData, dictionary, stashAwayReturns, formatter, marker, selectedIndexName) => {
    const chartProperties = {
        height: 400,
        margin: { top: 10, right: 20, bottom: 60, left: 80 },
        animate: true,
        enableSlices: 'x',
        xScale: {
            type: 'time',
            format: '%Y-%m-%d',
            precision: 'day',
        },
        xFormat: "time:%Y-%m-%d",
        yScale: {
            type: 'linear',
        },
        curve: "monotoneX",
        axisBottom: {
            format: '%d %b %Y',
            legendOffset: -12,
        },
        enableGridX: false,
        pointSize: 1,
        pointBorderWidth: 1,
        pointBorderColor: {
            from: 'color',
            modifiers: [['darker', 0.3]],
        },
        colors: ['rgb(232, 178, 63)', 'rgb(56, 132, 217)'],
        enableCrosshair: false,
        data: [
            { id: selectedIndexName, data: baseLineData },
            { id: dictionary['stashaway_index_name'], data: stashAwayReturns }
        ],
        axisLeft: {
            format: (value) => {
                return formatter.format(value)
            },
            tickRotation: 0,
        },
        legends: [
            {
                "anchor": "bottom",
                "direction": "row",
                "justify": false,
                "translateX": -30,
                "translateY": 60,
                "itemDirection": "left-to-right",
                "itemWidth": 200,
                "itemHeight": 30,
                "symbolSize": 8,
                "itemTextColor":"white",
                "symbolShape": "square"
            }
        ]
    }
    if (marker) {
        chartProperties["markers"] =
            [
                {
                    axis: 'x',
                    value: new Date(marker.x),
                    lineStyle: { strokeWidth: 1, stroke: 'rgb(63, 182, 178)' },
                },
            ]
    }
    return chartProperties
}

let themeForLineChart = {
    axis: {
        ticks:
        {
            text: { fill: 'white', fontSize: 10 },
            line: { stroke: '#ddd', strokeWidth: 2 }
        }
    },
    grid: {
        line: {
            stroke: '#ddd', strokeWidth: 0.3,
        }
    },
}

let mapStateToProps = ({ performanceData }) => {
    return { performanceData }
}

export default connect(mapStateToProps, null)(RealTimeChart);