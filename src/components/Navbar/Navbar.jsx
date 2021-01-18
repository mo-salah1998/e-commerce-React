import React, {Component} from "react";
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import {ShoppingCart} from "@material-ui/icons";
import logo from '../../assets/commerce.png';
import UseStyles from './styles';
import {Link, useLocation} from 'react-router-dom';

const Navbar = ({totalItems}) => {
    const classes = UseStyles();
    const locations = useLocation();

    return (
        <>
            <AppBar className={classes.appBar} position="fixed" color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image}/>Commerce.js
                    </Typography>
                    <div className={classes.grow}/>
                    {locations.pathname === '/' && (
                        <div className={classes.button}>

                            <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>)}

                </Toolbar>
            </AppBar>
        </>
    )

}

export default Navbar;
