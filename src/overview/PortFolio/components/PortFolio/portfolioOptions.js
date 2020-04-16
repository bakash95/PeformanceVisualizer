import React, { useState } from 'react';
import { connect } from 'react-redux';

import { performanceDataAction } from 'redux/actions/performanceDataActions';
import './css/portfolioOptions.css'

const Button = (props) => {
    let selected = props.selected ? "selected" : ""
    let classes = `${props.className} ${selected}`
    return (
        <button className={classes} onClick={() => props.onClick(props.keyValue)}>{props.children}</button>
    )
}

const keysForPeriod = [
    {
        "keyName": "1 month",
        "keyValue": "1"
    },
    {
        "keyName": "6 months",
        "keyValue": "2"
    },
    {
        "keyName": "Year-to-date",
        "keyValue": "3"
    },
    {
        "keyName": "1 year",
        "keyValue": "4"
    },
    {
        "keyName": "5 years",
        "keyValue": "5"
    },
    {
        "keyName": "Max",
        "keyValue": "6"
    }
]

const PeriodSelector = (props) => {
    const [selectedButton, setSelected] = useState("6");
    const selectChange = (value) => {
        setSelected(value);
        props.performanceDataAction({ selectedButton })
    }
    return (
        <div className="cardContainer">
            {
                keysForPeriod.map((item) => {
                    let selected = item.keyValue === selectedButton ? "selected" : "";
                    return (
                        <Button keyValue={item.keyValue} selected={selected} onClick={selectChange} className="btn-style">{item.keyName}</Button>
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
    const [selectedButton, setSelected] = useState("1");
    const selectChange = (value) => {
        setSelected(value);
        let currency = (selectedButton === "1") ? "SGD" : "USD"
        props.performanceDataAction({ currency })
    }
    return (
        <div className="cardContainer flx-display just-end">
            {currencyOptions.map((item) => {
                let selected = item.keyValue === selectedButton ? "selected" : "";
                return (
                    <Button keyValue={item.keyValue} selected={selected} onClick={selectChange} className="btn-style">{item.keyName}</Button>
                )
            })
            }
        </div>
    )
}

const GraphOptions = (props) => {
    return (<div className="container flx-display">
        <PeriodSelector {...props} />
        <CurrenySelector{...props} />
    </div >
    );
}

export default connect(null, { performanceDataAction })(GraphOptions);
