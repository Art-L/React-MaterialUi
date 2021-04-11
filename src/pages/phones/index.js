import React, { Component } from "react";
import { get, cloneDeep } from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import { withRouter } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import apiCalls from "../../app/services/apiCalls";
import DB from "../../app/services/DB";
import utils from "../../app/services/utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import PhoneCard from "../../Components/PhoneCard/phoneCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

class phonesIndexPage extends Component {
  constructor(props) {
    super(props);
    const brandId = get(this.props, "match.params.brand") || null;
    this.state = {
      brandId,
      phonesResult: [],
      isloading: true,
      noResults: false,
      favorites: []
    };
  }

  setPhones = (phonesResponse) => {
    const brandId = get(this.state, "brandId") || "";
    const phonesResult = utils.getPhonesByBrand(brandId, phonesResponse);

    if (phonesResult.length) {
      this.setState({ phonesResult, isLoading: false, noResults: false });
    } else {
      this.setState({ isLoading: false, noResults: true });
    }
  };

//TODO add lazyload hook on Grid
  addMorePhones = (phonesResponse) => {
    const statePhones = cloneDeep(get(this.state, "phonesResult") || []);
    const brandId = get(this.state, "brandId") || "";
    const phonesResult = utils.getPhonesByBrand(brandId, phonesResponse);
    this.setState({ phonesResult: statePhones.concat(phonesResult) });
  };

  getPhones = () => {
    this.setState({ isLoading: true });
    apiCalls.getPhones((phonesResult) => this.setPhones(phonesResult));
  };

  //Workaround since functionalComponent cant access router 
  redirect = (redirectUrl)=>{
    this.props.history.push(redirectUrl)
  }

  getFavoritesList= async()=>{
    const favorites = (await DB.getItem('favorites'))||[]
    if(favorites.length){
      this.setState({favorites})
    }
  }

  addFavorite = id =>{
    const favorites = get(this.state,'favorites',[]);
    favorites.push(id)
    DB.setItem('favorites',favorites)
    this.setState({favorites})
  }

  removeFavorite = id =>{
    let favorites = get(this.state,'favorites',[]);
    favorites=favorites.filter(favorite =>favorite.toLowerCase() !== id.toLowerCase())
    DB.setItem('favorites',favorites)
    this.setState({favorites})
  }


  componentDidMount() {
    this.getPhones();
    this.getFavoritesList()
  }


  redirect = (redirectUrl)=>{
    const newWindow = window.open(redirectUrl, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  isFavorite = (id)=>{
    const favorites = get(this.state,'favorites',[]);
    return favorites.includes(id.toLowerCase());
  }

  render() {
    const { classes } = this.props;
    const brandId = get(this.state, "brandId");
    const { isLoading } = this.state;
    const phonesResult = get(this.state, "phonesResult");
    return (
      <div className={classes.root}>
        {isLoading ? <CircularProgress /> : <h2>Phones:{brandId}</h2>}
        <Grid container spacing={3}>
          {phonesResult.map((phone) => {
            return (
              <Grid item xs={12} sm={6}>
                <PhoneCard
                  imageUrl={phone.imgUrl}
                  description={phone.displayName}
                  id={phone.contentKey}
                  enableFavorites
                  redirect={()=>this.redirect(phone.link)}
                  addFavorite={()=>this.addFavorite(phone.contentKey)}
                  removeFavorite={()=>this.removeFavorite(phone.contentKey)}
                  isFavorite={this.isFavorite(phone.contentKey)}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default withRouter(connect()(withStyles(useStyles)(phonesIndexPage)));
