import Axios from "axios";
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_ADD_LIST_ITEM } from "../constants/cartConstants";


const addItem =  (productId, qty) => async (dispatch,getState) => {
 //  When adding cart, get price ID and quanity and add to Redux state
  try{  
  const response = await fetch("/api/orders/price", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        unitAmount: 0,
        currency: "usd",
        product: productId,
      }),
    }).then((res) => res.json());
        
    
      dispatch({type:CART_ADD_LIST_ITEM, payload: {
        price:response.id,
        quantity:qty
      }});
 
  
    
}

catch (error) {
  console.log("ERROR " + error.message)

}
}
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch({
      type: CART_ADD_ITEM, payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      }
    });
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));

  } catch (error) {
      console.log(error.message);
  }
}
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const { cart: { cartItems } } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
}
const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}
export { addToCart, addItem, removeFromCart, saveShipping, savePayment }