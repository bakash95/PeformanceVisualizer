import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {Button} from 'common/components/components'
import { performanceDataAction } from 'redux/actions/performanceDataActions';
import './css/portfolioOptions.css'

const keysForPeriod = [
    {
        "keyName": "1 month",
        "keyValue": "1M"
    },
    {
        "keyName": "6 months",
        "keyValue": "6M"
    },
    {
        "keyName": "Year-to-date",
        "keyValue": "YTD"
    },
    {
        "keyName": "1 year",
        "keyValue": "1Y"
    },
    {
        "keyName": "5 years",
        "keyValue": "5Y"
    },
    {
        "keyName": "Max",
        "keyValue": "4Y"
    }
]

const PeriodSelector = (props) => {
    const [selectedPeriod, setSelected] = useState("5Y");
    useEffect(()=>{
        props.performanceDataAction({ selectedPeriod })
    })
    const selectChange = (value) => {
        setSelected(value);
    }
    return (
        <div className="cardContainer">
            {
                keysForPeriod.map((item) => {
                    let selected = item.keyValue === selectedPeriod ? "selected" : "";
                    return (
                        <Button key={item.keyValue} keyValue={item.keyValue} selected={selected} onClick={selectChange} className="btn-style">{item.keyName}</Button>
                    )
                })
            }
        </div>
    )
}

const currencyOptions = [
    {
        "keyName": "SGD",
        "keyValue": "1"
    },
    {
        "keyName": "USD",
        "keyValue": "2"
    },
]

const CurrenySelector = (props) => {
    const [selectedCurrency, setSelected] = useState("1");
    let currency = (selectedCurrency === "1") ? "SGD" : "USD"
    useEffect(()=>{
        props.performanceDataAction({ selectedCurrency:currency })
    })
    const selectChange = (value) => {
        setSelected(value);
    }
    return (
        <div className="cardContainer tbl-display just-end">
            {currencyOptions.map((item) => {
                let selected = item.keyValue === selectedCurrency ? "selected" : "";
                return (
                    <Button key={item.keyValue} keyValue={item.keyValue} selected={selected} onClick={selectChange} className="btn-style">{item.keyName}</Button>
                )
            })
            }
        </div>
    )
}

const GraphOptions = (props) => {
    return (<div className="pl-md-4 pr-md-4 tbl-display">
        <PeriodSelector {...props} />
        <CurrenySelector{...props} />
    </div >
    );
}

export default connect(null, { performanceDataAction })(GraphOptions);
