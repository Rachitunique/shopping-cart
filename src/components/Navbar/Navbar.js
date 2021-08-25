import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from "react-redux";
import "./Navbar.css";
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    tool:{
        position:"relative"
    }
  }));
function Navbar2({cart}) {
    const classes = useStyles();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
      let count = 0;
      cart.forEach((item) => {
        count += item.qty;
      });
  
      setCartCount(count);
    }, [cart]);
  
    return (
        <div className={classes.root}>
          <AppBar style={{backgroundColor:'yellow'}} position="static">
          <Toolbar className={classes.tool}>
            
            <Typography variant="h6" className={classes.title}>
              <Link to='/' style={{color:'#2f3542'}}>
              Redux Shopping
              </Link>
            </Typography>
            <Link to='/cart' style={{color:'#2f3542'}}>
            <Button color="inherit">Cart<ShoppingCartIcon style={{marginLeft:'12%', marginRight:'1%'}}/><span className='cartNumber' style={{}}>{cartCount}</span></Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    )
}

//cart ka state consume kar liya apne global state me se se uske baad uske upar loop lga ke har ek object ki quantity ko 
//add kar liya useEffect me uske baad hmri is quantity ko utha ke apne navbar me show kar diya cart icon ke upar
const mapStateToProps = (state) => {
    return {
      cart: state.shop.cart,
    };
  };
  
  export default connect(mapStateToProps)(Navbar2);