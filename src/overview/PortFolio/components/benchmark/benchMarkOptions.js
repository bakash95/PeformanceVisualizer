import React, { useState } from 'react';
import { FormControl, MenuItem, Select } from '@material-ui/core';

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
                    <MenuItem value="-1" disabled>Which benchmark do you want to compare</MenuItem>
                    <MenuItem value={10}>{stockComparsionIndex[10]}</MenuItem>
                    <MenuItem value={20}>{stockComparsionIndex[20]}</MenuItem>
                    <MenuItem value={30}>{stockComparsionIndex[30]}</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

const stockComparsionIndex = {
    10: "mix of 60% stocks (VTSMX ETF)",
    20: "40% bonds (VBMFX ETF)",
    30: "20% stocks and 80% bonds"
}

export default PortFolio;