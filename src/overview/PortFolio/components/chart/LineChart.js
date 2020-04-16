import React, { PureComponent } from 'react'
import { ResponsiveLine } from '@nivo/line'

import apiCaller from 'apiCaller'
import { connect } from 'react-redux'

class RealTimeChart extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            baseLineData: undefined,
            stashawayReturns: undefined,
            marker: undefined,
            currency: "SGD",
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
        if (request.selectedValue) {
            let successCallBack = (response) => {
                let { baseLineData, stashawayReturns, marker } = response
                this.setState({ ...nextProps.performanceData, baseLineData, stashawayReturns, marker })
            }
            this.fetchPerformanceList(request, successCallBack);
        }
    }

    async fetchPerformanceList(request, successCallBack) {
        try {
            let response = await apiCaller.callAPI('/listAccounts', 'POST', request);
            successCallBack(response);
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const { baseLineData, stashawayReturns, marker } = this.state
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

        let { locale, currency } = this.state.currencyFormat[this.state.currency]
        const formatter = new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
        })

        return (
            baseLineData ? <div className="container" style={{ height: commonProperties.height, background: 'rgb(7, 35, 64)' }}>
                <ResponsiveLine
                    {...commonProperties}
                    data={[
                        { id: this.state.selectedIndex, data: baseLineData },
                        { id: 'Stashaway', data: stashawayReturns }
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
                        tickValues: 'every 1 year',
                        legendOffset: -12,
                    }}
                    pointSize={1}
                    pointBorderWidth={1}
                    pointBorderColor={{
                        from: 'color',
                        modifiers: [['darker', 0.3]],
                    }}
                    colors={{ scheme: 'nivo' }}
                    useMesh={true}
                    enableCrosshair={false}
                    sliceTooltip={(props) => {
                        let { slice } = props;
                        let date = undefined;
                        return (
                            <div
                                style={{
                                    background: 'white',
                                    padding: '9px 12px',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    textAlign: 'end',
                                    borderRadius: '10px'
                                }}
                            >
                                {
                                    slice.points.some((point) => {
                                        if (point.data.xFormatted) {
                                            date = new Date(point.data.xFormatted).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                                            return point;
                                        }
                                        return false;
                                    })
                                }
                                <p>{date}</p>
                                {slice.points.map(point => {
                                    return (
                                        <div
                                            key={point.id}
                                            style={{
                                                color: point.serieColor,
                                                padding: '3px 0',
                                            }}
                                        >
                                            <strong>{point.serieId}</strong>
                                            <div className="cardTextContent" style={{
                                                padding: '3px 3px 3px 3px',
                                            }}>{formatter.format(point.data.yFormatted)}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }}
                    theme={{
                        axis: {
                            ticks:
                            {
                                text: { fill: 'white', fontSize: 10 },
                                line: { stroke: '#ddd', strokeWidth: 2 }
                            }
                        },
                        grid: {
                            line: {
                                stroke: '#ddd', strokeWidth: 0,
                                strokeDasharray: "1 1"
                            }
                        },
                    }}
                />
            </div>
                :
                <div />
        )
    }
}

let mapStateToProps = ({ performanceData }) => {
    return { performanceData }
}

export default connect(mapStateToProps, null)(RealTimeChart);