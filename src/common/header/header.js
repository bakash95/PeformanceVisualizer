import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core';

import Logo from 'assets/companylogo.png'
import './css/header.css'

import MenuIcon from '@material-ui/icons/Menu'

const ToggleMenu = () => {
    let { dictionary } = window;
    return (
        <>
            <AppBar className="container"
                elevation={0}
                position="relative"
                color="transparent"
            >
                <header className="App-header show-sm">
                    <img src={Logo} alt="logo" width="10%" height="100%" />
                    <div className="nav_items">
                        <p className="nav_item">{dictionary['Home']}</p>
                        <p className="nav_item">{dictionary['Manage_Deposits']}</p>
                        <p className="nav_item">{dictionary['Refer_friend']}</p>
                        <p className="nav_item">{dictionary['Support']}</p>
                    </div>
                </header>
                <Toolbar className="hide-sm flx-display">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={() => { }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <div>
                    <>
                        <b className="theme_txt_clr">&larr; {dictionary['overview']}</b>
                    </>
                    <h1>{dictionary['General_Investing']}</h1>
                </div>
            </AppBar>
            <div className="internal-nav">
                <span className="nav_item internal-nav-selected">Overview</span>
                <span className="nav_item">Assets</span>
                <span className="nav_item">Projection</span>
                <span className="nav_item">About Portfolio</span>
            </div>
        </>
    )
}

export default ToggleMenu;