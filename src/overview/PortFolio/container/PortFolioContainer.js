import React, { PureComponent} from 'react'
import { connect } from 'react-redux';

import PortFolio from '../components/benchmark/benchMarkOptions'
import LineChart from '../components/chart/LineChart'
import GraphOptions from '../components/PortFolio/portfolioOptions'
import { performanceDataAction } from 'redux/actions/performanceDataActions';

import './css/portfolio.css'

class PortFolioContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <PortFolio {...this.props} />
                <GraphOptions />
                <LineChart />
            </>
        )
    }
}

export default connect(null, { performanceDataAction })(PortFolioContainer);