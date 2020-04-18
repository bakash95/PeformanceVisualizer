import React from 'react'

import './css/chartHelper.css'

export const popupForPerformanceDetail = (props, formatter) => {
    let { slice } = props;
    let date = undefined;
    return (
        <div className="slice-styling">
            {
                slice.points.some((point) => {
                    if (point.data.xFormatted) {
                        date = new Date(point.data.xFormatted).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                        return true;
                    }
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
                        }}>
                        <p className="indexname-style">{point.serieId}</p>
                        <div className="cardTextContent">{formatter.format(point.data.yFormatted)}</div>
                    </div>
                )
            })}
        </div>
    )
}