import React from 'react'

import './css/chartHelper.css'

export const popupForPerformanceDetail = (props, formatter, currencyCode) => {
    let { slice } = props;
    let date = undefined;
    let sliceContent = slice.points.map(point => {
        if (point.data.xFormatted) {
            date = dateConverter(point.data.xFormatted)
        }
        return (
            <div
                key={point.id}
                style={{
                    color: point.serieColor,
                    padding: '1px 0',
                }}>
                <span className="indexname-style">{point.serieId}</span>
                <div className="theme-txt">{formatter.format(point.data.yFormatted) + ' ' + currencyCode}</div>
            </div>
        )
    })
    return (
        <div className="slice-styling">
            <h5>{date}</h5>
            {sliceContent}
        </div>
    )
}

let dateConverter = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
}