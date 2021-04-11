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
import CircularProgress from "@material-ui/core/CircularProgress";
import PhoneCard from "../../Components/PhoneCard/phoneCard";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  brandsPage: {
  
  },

}));

class brandsIndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      phoneBrands: [],
      headline: "",
    };
  }

  setBrands = (brandResponse) => {
    const headline = get(brandResponse, "headline") || "";
    const phoneBrands = get(brandResponse, "options") || [];
    this.setState({ headline, phoneBrands, isLoading: false });
  };

  //TODO add lazyload hook on Grid
  addMoreBrands = (brandResponse) => {
    const stateBrands = cloneDeep(get(this.state, "phoneBrands") || []);
    const responseBrands = get(brandResponse, "phoneBrands") || [];
    this.setState({ phoneBrands: stateBrands.concat(responseBrands) });
  };

  getPhoneBrands = () => {
    this.setState({ isLoading: true });
    apiCalls.getBrands((phoneBrands) => this.setBrands(phoneBrands));
  };
  redirect = (redirectUrl)=>{
    this.props.history.push(redirectUrl)
  }
  componentDidMount() {
    this.getPhoneBrands();
  }

  render() {
    const {isLoading} = this.state
    const { classes } = this.props;
    const phoneBrands = get(this.state, "phoneBrands");
    return <div  className={classes.brandsPage} >{isLoading ? (<CircularProgress/>):(<h2>Brands</h2>)}
            <Grid container spacing={3}>
          {phoneBrands.map((brand) => {
            return (
              <Grid item xs={12} sm={6}>
                <PhoneCard
                  imageUrl={brand.displayImageUrl}
                  description={brand.displayName}
                  id={brand.id}
                  redirect={()=>this.redirect('/phones/'+brand.id)}
                />
              </Grid>
            );
          })}
        </Grid>
    </div>;
  }
}

export default withRouter(connect()(withStyles(useStyles)(brandsIndexPage)));
