import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';
import { connect } from 'react-redux';

import { performanceDataAction } from 'redux/actions/performanceDataActions';

import './css/benchMark.css'

const PortFolio = (props) => {
    let { dictionary } = window;
    return (
        <div className="pl-md-5 pr-md-5 col-12">
            <h3>{dictionary["portfolio_benchmark"]}</h3>
            <section className="row col-12 p-0 ml-0">
                <article className="col-12 col-sm-6 p-3" style={{ background: '#f5f5f5' }}>
                    <div className="cardText">
                        <summary className="cardTextHeader">{dictionary["General_Investing"]}</summary>
                        <p className="cardTextContent"><b>{dictionary["stashaway_index_name"]}</b></p>
                    </div>
                </article>
                <div className="vs_relative">
                    <span className="vs_circle">vs</span>
                </div>
                <article className="col-12 col-sm-6 p-3" style={{ background: 'rgb(239, 238, 238)' }}>
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
    useEffect(()=>{
        props.onChange(selectedIndexValue, stockComparsionIndex[selectedIndexValue]);
    })
    let onChange = (event) => {
        let selectedValue = event.target.value
        setSelected(selectedValue);
    }
    return (
        <div className="pd10">
            <FormControl className="maxwdth-white" variant="outlined">
                <Select className="maxwdth-white"
                    autoWidth={false}
                    labelId="outlined-age-native-simple-label"
                    id="outlined-age-native-simple"
                    onChange={onChange}
                    value={selectedIndexValue}>
                    <MenuItem value="-1" disabled>{window.dictionary["benchmark_placeholder"]}</MenuItem>
                    {
                        Object.entries(stockComparsionIndex).forEach(([key,value])=>{
                            return <MenuItem value={key}>{stockComparsionIndex[key]}</MenuItem>;
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}

const stockComparsionIndex = {
    10: "60% stocks (VTSMX ETF) and 40% bonds (VBMFX ETF)",
    20: "20% stocks (VTSMX ETF) and 80% bonds (VBMFX ETF)",
    30: "30% stocks , 60% Government bonds and 10% Gold Bonds"
}

export default connect(null, { performanceDataAction })(PortFolio);
