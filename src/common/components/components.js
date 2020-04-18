import React from 'react'

const Button = (props) => {
    let selected = props.selected ? "selected" : ""
    let classes = `${props.className} ${selected}`
    return (
        <button className={classes} onClick={() => props.onClick(props.keyValue)}>{props.children}</button>
    )
}

export {Button};