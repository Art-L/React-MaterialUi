import React, { Component,useState } from "react";
import { useSelector, useDispatch,connect } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  phoneCard: {
    maxWidth: 345
  },
  media: {
    height: 140
  }

}));

class PhoneCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { classes } = this.props;
    return (
      <Card className={classes.phoneCard}>
        <CardActionArea>
          <CardMedia
             className={classes.media}
             wide
            image='https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/images/brands/alcatel_front_270x540.png'
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Like
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default withRouter(withStyles(useStyles)(PhoneCard));
