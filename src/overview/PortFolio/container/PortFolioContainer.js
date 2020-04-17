import React from 'react'

import PortFolio from '../components/benchmark/benchMarkOptions'
import LineChart from '../components/chart/LineChart'
import GraphOptions from '../components/PortFolio/portfolioOptions'

import './css/portfolio.css'

const PortFolioContainer = () => {
    return (
        <>
            <PortFolio />
            <GraphOptions />
            <LineChart />
        </>
    )
}

export default PortFolioContainer;