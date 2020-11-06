import React, { useEffect, useReducer } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import "./normalize.css";
import "./global.css";

let priceID;


// Set price based on Cart.
const fetchPriceID = async (totalPrice) => {
  const response = await fetch("/api/orders/price", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      unitAmount: totalPrice,
      currency: "usd",
      product: "prod_IIaiWOqNkkUVe0",
    }),
  });
  return response.json();
};
// fetchPriceID().then((data) => console.log(data.id));

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

function reducer(state, action) {
  switch (action.type) {
    case "useEffectUpdate":
      return {
        ...state,
        ...action.payload,
        price: formatPrice({
          amount: action.payload.unitAmount,
          currency: action.payload.currency,
          quantity: state.quantity,
        }),
      };
    case "increment":
      return {
        ...state,
        quantity: state.quantity + 1,
        price: formatPrice({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity + 1,
        }),
      };
    case "decrement":
      return {
        ...state,
        quantity: state.quantity - 1,
        price: formatPrice({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity - 1,
        }),
      };
    case "setLoading":
      return { ...state, loading: action.payload.loading };
    case "setError":
      return { ...state, error: action.payload.error };
    default:
      throw new Error();
  }
}

const StripeCheckout = () => {
  // Redux.
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const { cartItems, shipping, payment } = cart;

  const priceFixed = order.totalPrice * 100;
  
  fetchPriceID(priceFixed);
  

  let items = [];
  const getPriceID = async (productID,price,qty) => {
   
    const ID = await fetch("/api/orders/price", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        unitAmount: price * 100 ,
        currency: "usd",
        product: productID,
      }),
    }).then(res => res.json()).then(data => items.push({price:data.id,quantity:qty}));

   
  };

 
  cartItems.forEach((item) => getPriceID(item.product,item.price,item.qty));
 
  const {_id} = orderDetails.order;
 
  const fetchCheckoutSession = async ({ quantity }) => {
    
    return fetch("/api/orders/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        email: cart.shipping.contact,
          items:items,
          orderID:_id,
          userToken:userInfo.token,
      }),
    }).then((res) => res.json());
  };

  const [state, dispatch] = useReducer(reducer, {
    quantity: 1,
    price: priceFixed,
    loading: false,
    error: null,
    stripe: null,
  });

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const { publicKey, unitAmount, currency } = await fetch(
        "/api/orders/config"
      ).then((res) => res.json());

      // Make sure to call `loadStripe` outside of a component’s render to avoid
      // recreating the `Stripe` object on every render.

      dispatch({
        type: "useEffectUpdate",
        payload: { unitAmount, currency, stripe: await loadStripe(publicKey) },
      });
    }

    fetchConfig();
  }, []);

  const handleClick = async (event) => {
    // Call your backend to create the Checkout session.
    dispatch({ type: "setLoading", payload: { loading: true } });
    const { sessionId } = await fetchCheckoutSession({
      quantity: state.quantity,
    });
    // When the customer clicks on the button, redirect them to Checkout.
    const { error } = await state.stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      dispatch({ type: "setError", payload: { error } });
      dispatch({ type: "setLoading", payload: { loading: false } });
    }
  };

  return (
    <div className="sr-root">
      <div className="sr-main">
        {/* <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header> */}
        <section className="container">
          {/* <div>
            <h1>Single photo</h1>
            <h4>Purchase a Pasha original photo</h4>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://picsum.photos/280/320?random=4"
                width="140"
                height="160"
              />
            </div>
          </div> */}
          {/* <div className="quantity-setter">
            <button
              className="increment-btn"
              disabled={state.quantity === 1}
              onClick={() => dispatch({ type: 'decrement' })}
            >
              -
            </button>
            <input
              type="number"
              id="quantity-input"
              min="1"
              max="10"
              value={state.quantity}
              readOnly
            />  
            <button
              className="increment-btn"
              disabled={state.quantity === 10}
              onClick={() => dispatch({ type: 'increment' })}
            >
              +
            </button>
          </div> */}
          {/* <p className="sr-legal-text">Number of copies (max 10)</p> */}

          <button
            role="link"
            onClick={handleClick}
            disabled={!state.stripe || state.loading}
          >
            {state.loading || !state.price
              ? `Loading...`
              : `Buy for $${order.totalPrice}`}
          </button>
          <div className="sr-field-error">{state.error?.message}</div>
        </section>
      </div>
    </div>
  );
};

export default StripeCheckout;
