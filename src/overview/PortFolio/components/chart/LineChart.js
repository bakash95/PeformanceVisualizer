import React, { PureComponent } from 'react'
import { ResponsiveLine } from '@nivo/line'

import { CircularProgress } from '@material-ui/core'

import './css/lineChart.css'

import { popupForPerformanceDetail } from './lineCharHelper'
import apiCaller from 'apiCaller'
import { connect } from 'react-redux'

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
        if (request.selectedIndexValue) {
            //for now spinner is disabled as the loading time is negligible
            this.setState({ loadSpinner: true });
            let callBackForResponseLoaded = (response) => {
                let { baseLineData, stashAwayReturns, marker } = response
                this.setState({ ...nextProps.performanceData, baseLineData, stashAwayReturns, marker, loadSpinner: false })
            }
            let errorCallBack = () => {
                this.setState({ loadSpinner: false });
            }
            this.fetchPerformanceList(request, callBackForResponseLoaded, errorCallBack);
        }
    }

    async fetchPerformanceList(request, successCallBack, errorCallBack) {
        try {
            let response = await apiCaller.callAPI('/getPerformanceData', 'POST', request);
            successCallBack(response);
        } catch (err) {
            console.log(err)
            errorCallBack();
        }
    }

    render() {
        if (this.state.loadSpinner) {
            return <div className="container"><CircularProgress className="progress_align" /></div>
        }
        const { baseLineData, stashAwayReturns, marker } = this.state
        const commonProperties = {
            height: 400,
            margin: { top: 50, right: 20, bottom: 60, left: 80 },
            animate: true,
            enableSlices: 'x',
        }

        if (marker) {
            commonProperties["markers"] =
                [
                    {
                        axis: 'x',
                        value: new Date(this.state.marker.x),
                        lineStyle: { strokeWidth: 1, stroke: 'rgb(63, 182, 178)' },
                    },
                ]
        }

        let { locale, currency } = this.state.currencyFormat[this.state.selectedCurrency]
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        })

        return (
            baseLineData ? <div className="container-chart" style={{ height: commonProperties.height, background: 'rgb(7, 35, 64)' }}>
                <ResponsiveLine
                    {...commonProperties}
                    data={[
                        { id: this.state.selectedIndexName, data: baseLineData },
                        { id: 'Stashaway', data: stashAwayReturns }
                    ]}
                    xScale={{
                        type: 'time',
                        format: '%Y-%m-%d',
                        precision: 'day',
                    }}
                    xFormat="time:%Y-%m-%d"
                    yScale={{
                        type: 'linear',
                    }}
                    curve="monotoneX"
                    axisLeft={{
                        format: (value) => {
                            return formatter.format(value);
                        },
                        tickRotation: 0,
                    }}
                    axisBottom={{
                        format: '%d %b %Y',
                        legendOffset: -12,
                    }}
                    enableGridX={false}
                    pointSize={1}
                    pointBorderWidth={1}
                    pointBorderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    }}
                    colors={{ scheme: 'nivo' }}
                    enableCrosshair={false}
                    sliceTooltip={(props) => popupForPerformanceDetail(props, formatter)}
                    theme={themeForLineChart}
                />
            </div>
                :
                <div />
        )
    }
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