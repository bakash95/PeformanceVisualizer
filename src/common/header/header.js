import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

import './css/header.css'


const ToggleMenu = () => {
    let { dictionary } = window;
    return (
        <>
            <SnackBar />
            <div className="col-12 pl-md-5 ">
                <AppBar
                    elevation={0}
                    position="relative"
                    color="transparent"
                >
                    <header className="App-header show-sm">
                        <span className="logo-styl" />
                        <div className="pt-2 pr-4 nav_items">
                            <p className="nav_item">{dictionary['Home']}</p>
                            <p className="nav_item">{dictionary['Manage_Deposits']}</p>
                            <p className="nav_item">{dictionary['Refer_friend']}</p>
                            <p className="nav_item">{dictionary['Support']}</p>
                        </div>
                    </header>
                    <Toolbar disableGutters={true} className="hide-md flx-display">
                        <IconButton size='small'
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={() => { }}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                    <b className="theme_txt_clr">&larr; {dictionary['overview']}</b>
                    <h3>{dictionary['General_Investing']}</h3>
                </AppBar>
                <InternalNavBar />
            </div>
        </>
    )
}

const InternalNavBar = () => {
    let dictionary = window.dictionary;
    return <div className="internal-nav">
        <span className="nav_item internal-nav-selected">{dictionary['overview']}</span>
        <span className="nav_item">{dictionary['assets']}</span>
        <span className="nav_item">{dictionary['projection']}</span>
        <span className="nav_item">{dictionary['about_portfolio']}</span>
    </div>
}

/*this component is only visible for mobile devices
    shows a disclaimer to inform user to use landscape mode */
const SnackBar = () => {
    let [open, setOpen] = useState(true);
    let toggleClose = () => {
        setOpen(false);
    }
    return <Snackbar className="hide-md" open={open} onClose={toggleClose} >
        <SnackbarContent message={window.dictionary['disclaimer_mobile']} />
    </Snackbar >
}

export default ToggleMenu;