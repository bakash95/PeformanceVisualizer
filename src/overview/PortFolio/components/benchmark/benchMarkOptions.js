import React, { useState } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';

import { performanceDataAction } from 'redux/actions/performanceDataActions';

import './css/benchMark.css'

const PortFolio = (props) => {
    let { dictionary } = window;
    return (
        <div className="container">
            <h3>{dictionary["portfolio_benchmark"]}</h3>
            <section className="flx-display">
                <div className="vs_relative">
                    <p className="vs_circle">vs</p>
                </div>
                <article className="cardContainer" style={{ background: '#f5f5f5' }}>
                    <div className="cardText">
                        <summary className="cardTextHeader">{dictionary["General_Investing"]}</summary>
                        <p className="cardTextContent"><b>{dictionary["stashaway_index_name"]}</b></p>
                    </div>
                </article>
                <article className="cardContainer" style={{ background: 'rgb(239, 238, 238)' }}>
                    <div className="cardText">
                        <SelectField onChange={(selectedIndexValue, selectedIndexName) => { props.performanceDataAction({ selectedIndexValue, selectedIndexName }) }} />
                    </div>
                </article>
            </section>
        </div>
    )
}

const SelectField = (props) => {
    let [selectedIndexValue, setSelected] = useState(-1);
    let onChange = (event) => {
        let selectedValue = event.target.value
        props.onChange(selectedValue, stockComparsionIndex[selectedValue]);
        setSelected(selectedValue);
    }
    return (
        <div className="pd10">
            <FormControl className="width-80" variant="outlined">
                <Select
                    labelId="outlined-age-native-simple-label"
                    id="outlined-age-native-simple"
                    onChange={onChange}
                    value={selectedIndexValue}
                >
                    <MenuItem value="-1" disabled>{window.dictionary["benchmark_placeholder"]}</MenuItem>
                    <MenuItem value={10}>{stockComparsionIndex[10]}</MenuItem>
                    <MenuItem value={20}>{stockComparsionIndex[20]}</MenuItem>
                    <MenuItem value={30}>{stockComparsionIndex[30]}</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

const stockComparsionIndex = {
    10: "60% stocks (VTSMX ETF) and 40% bonds (VBMFX ETF)",
    20: "20% stocks (VTSMX ETF) and 80% bonds (VBMFX ETF)"
}

export default connect(null, { performanceDataAction })(PortFolio);