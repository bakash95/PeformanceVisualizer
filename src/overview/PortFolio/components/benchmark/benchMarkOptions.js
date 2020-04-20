import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, Select, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';

import apiCaller from 'apiCaller'
import { fetchIndexOptions } from 'overview/PortFolio/portFolioActions'
import { performanceDataAction } from 'redux/actions/performanceDataActions';

import './css/benchMark.css'

const PortFolio = (props) => {
    let { dictionary } = window;
    let [indexOptions, setIndexOptions] = useState({})
    useEffect(() => {
        (async function () {
            try {
                let response = await apiCaller.callAPI(fetchIndexOptions);
                setIndexOptions(response.indexes);
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])
    return (
        <div className="pl-md-5 pr-md-5 col-12">
            <h3>{dictionary["portfolio_benchmark"]}</h3>
            <section className="row col-12 p-0 ml-0">
                <article className="col-12 col-sm-6 p-4" style={{ background: '#f5f5f5' }}>
                    <div className="cardText">
                        <div className="cardTextHeader">{dictionary["General_Investing"]}</div>
                        <p className="theme-txt"><b>{dictionary["stashaway_index_name"]}</b></p>
                    </div>
                </article>
                <div className="vs_absolute">
                    <span className="vs_circle">vs</span>
                </div>
                <article className="col-12 col-sm-6 p-3" style={{ background: 'rgb(239, 238, 238)' }}>
                    <div className="cardText">
                        <SelectField fieldOptions={indexOptions} onChange={(selectedIndexValue, selectedIndexName) => { props.performanceDataAction({ selectedIndexValue, selectedIndexName }) }} />
                    </div>
                </article>
            </section>
        </div>
    )
}

let style = makeStyles({
    icon: {
        fill: 'rgb(63, 182, 178)',
    },
})

const SelectField = (props) => {
    let {fieldOptions} = props
    let classes = style()
    let [selectedIndexValue, setSelected] = useState(-1);
    useEffect(() => {
        props.onChange(selectedIndexValue, fieldOptions[selectedIndexValue]);
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
                    inputProps={{
                        classes: {
                            icon: classes.icon,
                        },
                    }}
                    onChange={onChange}
                    value={selectedIndexValue}>
                    <MenuItem value="-1" disabled>{window.dictionary["benchmark_placeholder"]}</MenuItem>
                    {
                        props.fieldOptions && Object.entries(props.fieldOptions).map(([key, value]) => {
                            return <MenuItem key={key} value={key}>{value}</MenuItem>;
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default connect(null, { performanceDataAction })(PortFolio);
