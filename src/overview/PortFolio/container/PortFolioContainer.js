import React, { PureComponent, useState } from 'react'

import Select from '@material-ui/core/Select';
import { MenuItem, FormControl } from '@material-ui/core';
import LineChart from '../components/chart/LineChart'
import GraphOptions from '../components/PortFolio/portfolioOptions'
import { performanceDataAction } from '../../../redux/actions/performanceDataActions';

import './css/portfolio.css'
import { connect } from 'react-redux';

class PortFolioContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <PortFolio {...this.props}/>
                <GraphOptions />
                <LineChart />
            </>
        )
    }
}

const PortFolio = (props) => {
    return (
        <div className="container">
            <h3>Portfolio benchmark</h3>
            <section className="flx-display">
                <article className="cardContainer" style={{ background: '#f5f5f5' }}>
                    <div className="cardText">
                        <summary className="cardTextHeader">General Investing</summary>
                        <p className="cardTextContent"><b>Stash Away Risk Index 14%</b></p>
                    </div>
                </article>
                <article className="cardContainer" style={{ background: 'rgb(239, 238, 238)' }}>
                    <div className="cardText">
                        <SelectField onChange={(indexValue) => {props.performanceDataAction({indexValue})}} />
                    </div>
                </article>
            </section>
        </div>
    )
}

const SelectField = (props) => {
    let [selectedValue, setSelected] = useState(10);
    let onChange = (event) => {
        let selectedValue = event.target.value
        props.onChange(selectedValue);
        setSelected(selectedValue);
    }
    return (
        <FormControl variant="outlined" className="width-50">
            <Select
                labelId="outlined-age-native-simple-label"
                id="outlined-age-native-simple"
                onChange={onChange}
                value={selectedValue}
            >
                <MenuItem value="-1" disabled>Which benchmark do you want to compare</MenuItem>
                <MenuItem value={10}>mix of 60% stocks (VTSMX ETF)</MenuItem>
                <MenuItem value={20}>40% bonds (VBMFX ETF)</MenuItem>
                <MenuItem value={30}>20% stocks and 80% bonds</MenuItem>
            </Select>
        </FormControl>
    )
}

export default connect(null, { performanceDataAction })(PortFolioContainer);