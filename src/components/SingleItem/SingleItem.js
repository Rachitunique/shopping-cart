import React from "react";
import styles from "./SingleItem.css";
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { addToCart } from "../../redux/Shopping/shopping-actions";
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
const SingleItem = ({ current, addToCart }) => {
  return (
    <div className="s-container">
      <div className='img-container'>
      <img
        className="img"
        src={current.image}
        alt={current.title}
      />
      </div>
      <div className="detailss">
        <h1 className='p-name' >{current.title}</h1>
        <p style={{color:'#d63031', marginBottom:'5%'}}><span style={{color:'grey'}}>M.R.P.</span>&nbsp; ₹ {current.price}</p>
        <h4 style={{color:'#2d3436', marginBottom:'4%'}}>Description</h4>
        <p className='description'>{current.description}</p>
        

        <Button style={{backgroundColor:'#e67e22', marginTop:'5%'}}
          onClick={() => addToCart(current.id)}
          className={styles.details__addBtn}
        >
          <ShoppingCartOutlinedIcon/>&nbsp;
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    current: state.shop.currentItem,
  };
};

//for addition of elements to cart
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);