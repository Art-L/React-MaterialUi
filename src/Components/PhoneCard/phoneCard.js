import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { PinDropSharp } from "@material-ui/icons";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
  phoneCard: {
    maxWidth: 200,
    minHeight: 450,
  },
  media: {
    height: 400,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();

  const onFavoriteClick = (isFavorite) => {
   
    if (props.addFavorite && props.removeFavorite) {
      if(isFavorite){
        props.removeFavorite(props.id);
      }else{
        props.addFavorite(props.id);
      }
      console.log("favorite click,", props.id);
     
    } else {
      console.log("favorite click, no action ", props.id);
    }
  };

  const onRedirect = () => {
    if (props.redirect) {
      console.log("redirect click,", props.id);
      props.redirect(props.id);
    } else {
      console.log("redirect click, no action ", props.id);
    }
  };

  const { description, imageUrl, id, enableFavorites,isFavorite} = props;

    console.log('---favorite--',isFavorite);
  
  return (
    <Card className={classes.phoneCard} key={id}>
      <CardActionArea>
        <CardMedia
          onClick={() => onRedirect()}
          className={classes.media}
          wide
          image={imageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {enableFavorites && (isFavorite?(<FavoriteIcon size="small" color="primary" onClick={() => onFavoriteClick(isFavorite)}/>):(<FavoriteBorderIcon size="small" color="primary" onClick={() => onFavoriteClick(isFavorite)}/>))
        
      }

      </CardActions>
    </Card>
  );
}
