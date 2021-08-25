import React,{useState,useEffect} from 'react'
import './Cart.css';
import { connect } from "react-redux";
import CartItem from './CartItem/CartItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {coupons} from '../../constants/coupons'
function Cart1({cart}) {
  //jo jo chize change hoti hai unhi ka state nana padta hai
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [coupon,setCoupon] =useState('');
    const [loading,setLoading] =useState(true);
    const [success,setSuccess]=useState(null);
    const [oldPrice,setoldPrice] =useState(null);
    const getText=(e)=>{
      setCoupon(e.target.value)
    }
    const ApplyCoupon = ()=>
    {
      console.log(coupon);

      let couponm = coupon.trim().toUpperCase();
      //kya coupan me hamne jo enter kiya UI pe wo wali key padi hui hai
      let obj = coupons[couponm];
      if(obj==undefined)
      {
        console.log('Coupon is not applicable')
        //sucess aur loading ko false rakhne se aata hai not valid try again
        //aur loading false returns nothing but loading true returns the apply coupon box again
        setSuccess(false);
        setLoading(false);
      }
      else
      {
        setSuccess(true);
        setLoading(false);
        console.log(obj.discount);
        let discount = (totalPrice/100)*(obj.discount);
        let newPrice = Math.trunc(totalPrice-discount);
        //ye set kiya taki agar koi revert kar de coupon ko to mere pass purana wala data pda ho
        setoldPrice(totalPrice);
        setTotalPrice(newPrice);
      }
    }
    const revert = ()=>{
      setTotalPrice(oldPrice);
      setoldPrice(null);
      //sucess has three states true,false and null , jab sucess true hai to mera coupn valid wala box aa jaye
      //jab sucess false hai to mere not valid wala box aa jaye , jab sucess null hai to simple box aa jaye jo
      //jisme coupon enter karne ko bola tha aur jab ham revert karte hai to null wala box aa jata hai
      setSuccess(null);
      setLoading(true);
      setCoupon('');
    }
    const tryAgain = ()=>{
      setSuccess(null);
      setLoading(true);
      setCoupon('');
    }
    //useeffect ki vajah se hi cart me right wale box me totalprice
    //aur totalitems update ho rhe chhe cartitem me cart update ho
    //rha hai jab ham adjustqty aur removeFromCart action ko call kar rhe 
    //hai aur ye useeffect cart ke changes ko dekhkar reload kar de rha hai 
    useEffect(() => {
      let items = 0;
      let price = 0;
      //cart ke har ek item pe traverse kiya aur har item ka quntity aur price set kar diya jo input box me enter kiya tha 
      cart.forEach((item) => {
        items += item.qty;
        price += item.qty * item.price;
      });
  
      setTotalItems(items);
      setTotalPrice(price);
    }, [cart]);
  
    return (
        <>
        {cart.length==0?<><h1>Your cart is empty</h1></>:
        <div className='container-div' >
            <div className='items'>
                <div className='header'>
                    <h3 style={{paddingTop: '2%',paddingLeft: '2%',marginBottom:'3%'}}>Shopping Cart</h3>
                  
                    
                </div>
                <div className='added'>
                    {/*cart ke ander map ka method lagaya aur har ek cartitem ka component banaya
                    (cartitem ko item pass kiya hai cartitem.js me) aur diaplay kiya*/}
                         {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                          ))}
                    
                </div>
            </div>
            <div className='details-c'>
              <div className='details'>
            <h4 style={{textAlign:'center', paddingTop:'5%'}}>Cart Summary</h4>
        <div style={{textAlign:'center', marginBottom: '5%', marginTop:'5%'}} >
          <span>Subtotal ({totalItems} items) : </span>
          <span style={{fontWeight:'bold'}}>₹ {totalPrice}</span>
        </div>
        
          <>
          {loading==true?<div className='coupon'>
        <TextField value={coupon} style={{marginRight:'2%'}} id="standard-basic" label="Enter code" onChange={getText} />
        <Button variant="outlined" size='small' onClick={ApplyCoupon}>
          Apply
        </Button></div>
        :<>
        {
        success==true?<div className='smsg'>
          <h4>Code applied !</h4>
          
          <div className='revert'>
        <Button onClick={revert} size='small' variant="contained" color="secondary"
        >
          Revert
        </Button>
          </div>
        </div>
        :<div className='fmsg'>
          <h4>Not valid !</h4>
          <div className='revert'>
        <Button onClick={tryAgain} size='small' variant="contained" color="secondary"
        >
         Try Again
        </Button>
          </div>
        </div>
        
        }
        </>
}
        </>
        
        <div className='checkout'>
        <Button variant="contained" color="primary">
          Proceed To Buy
        </Button>
        </div>
            </div>
            </div>
        </div>
        }
        </>
    )
}
const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Cart1);