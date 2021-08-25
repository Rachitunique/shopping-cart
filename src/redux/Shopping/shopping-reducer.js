import * as actionTypes from "./shopping-types";
//import smartphone from './smartphone.jpg';
import img3 from './img3.jpg';
import speaker from './img4.jpg';
import book from './img5.jpg'
//isme to backend me initial state defined hai par nhi ho to thunk wala method use karna padta hai
const INITIAL_STATE = {
  products: [
    {
      id: 1,
      title: "Smartphone",
      description:
        `This smartphone is not just a sight to behold but also comes equipped with innovative features
         that will keep you productive and entertained. Its Helio G85 Gaming Processor ensures that you stay
          on top of the leaderboard while gaming. Its 16.5 cm (6.5) Mini-drop Fullscreen ensures an immersive
           experience while gaming, streaming content, and more. `,
      price: 20000,
      image:img3,
    },
    {
      id: 2,
      title: "Bluetooth Speaker",
      description:
          `With the Bluetooth speaker, you can enjoy motivational, dance, or instrumental music whenever you want. 
        It ensures an immersive listening experience with its 52 mm full-range driver so that you can stay entertained
         wherever you are. With an IPX7 rating, it ensures water resistance so that you can listen to music by
          the poolside without a worry in the world.`,
      price: 999.0,
      image: speaker,
    },
    {
      id: 3,
      title: "Book",
      description:
        `The land of Meluha is an empire created by Lord Rama, and it is ruled by the Suryavanshis. This empire 
        is powerful and proud, however, the Saraswati river that is their source of water is slowing drying up. 
        On top of that, the empire is at war with the Chandravanshis who have allied with The Nagas, a group of 
        sinister and deformed human beings who have extraordinary martial art skills.`,
      price: 250.0,
      image:book
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Creat Item data from products array where action.payload.id == product.id
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already than incart=true
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        //see add to cart in copy
        //if incart == false then than quantity of that item=1 else quantity of that item = previous quantity of that item+1
        //traversing in card array of state cart pe each index pe item
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
      //ham jab kisi object pe click karne ke baad wha jake item ki number adjust karde ne to cart ke upar uska number
      //reflect hota hai isi ko karne ke liye adjust item qty ka use karte hai
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      //current object me pura item jab kisi object pe view pe click kiya to wo khola mangta hai
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;