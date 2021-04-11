import React, { Component,useState } from "react";
import { useSelector, useDispatch,connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
    maxWidth:300
  },
  title: {
    flexGrow: 1,
  },
}));

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.homeButton}
            color="inherit"
            aria-label="menu"
            href="/phones"
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withRouter(withStyles(useStyles)(Header));
