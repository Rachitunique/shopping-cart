import React from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  loadCurrentItem,
  addToCart,
} from "../../../redux/Shopping/shopping-actions";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Product.css'
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
      marginBottom:'5%'
      
    },
    media: {
      height: '40vh',
    },
  });
//products comes from products.js ne jo pass kiya tha product component bnate wakht
//history.push(`/` se wo component load ho jata hai jisse click kiya hai view ke liye hamne jo app.js me current 
//pass kiya tha wo ab null nhi rahta load current id current ko null se nikalte aur history.push route provide karta
//hai jo furthur phir singleItem render karta hai)
function Product2({ product, addToCart, loadCurrentItem }) {
  const history = useHistory();
    const classes = useStyles();
    const handleOnClick = ()=>{
      loadCurrentItem(product);
      history.push(`/product/${product.id}`)
    }
    return (
        <Card className={classes.root}>
      
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.title}
            
          />
          <CardContent className={classes.cardstyle}>
            <Typography gutterBottom variant="h5" component="h2">
              {product.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{height: '26vh'}}>
              {product.description}
            </Typography>
            <br/>
            <Typography variant="h5" align='center' color="textPrimary" >
              {product.price}&nbsp;₹
            </Typography>
          </CardContent>
       
        <CardActions >
      
          <Button  size="small" color="primary" onClick={handleOnClick}>
            View Item
          </Button>
          
          <Button size="small" color="primary" onClick={() => addToCart(product.id)}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    )
}

//ham product ka data product.js se paas kar rhe hai to ise mapstatetoprops ki zrurat nhi chhe
//hame add to cart aur view item action karna hai har product pe to vo pass kar diya
const mapDispatchToProps = (dispatch) => {
    return {
      addToCart: (id) => dispatch(addToCart(id)),
      loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
    };
  };
  
  export default connect(null, mapDispatchToProps)(Product2);