import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const USPS = require('usps-webtools');
const usps = new USPS({
  server: 'http://production.shippingapis.com/ShippingAPI.dll',
  userId: process.env.USPS_ID ,
  ttl: 10000 //TTL in milliseconds for request
});



function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [contact, setContact] = useState('');
  const dispatch = useDispatch();

  let cart = useSelector(state => state.cart);
  if(!cart.shipping)
  {
    // Inital state.
    cart.shipping = {"adresss":""};
  }
  const resetAddress = (e) => {
    e.preventDefault();
   setAddress('');
  setCity('');
  setState('');
  setPostalCode('');
  setCountry('');
  setContact('');
    window.location.reload();
  }
  const submitHandler = (e) => {
    e.preventDefault();
  

usps.verify({
  street1: address,
  city,
  state,
  zip:postalCode
}, function(err, address) {
    if(err)
    {
      // Threw an address error 
    document.getElementById("error").innerText = err.message
}
   else {
     dispatch(saveShipping({ address, city,state, postalCode, country , contact}));
     props.history.push('payment');
      
   }
});

    
  
  }

 
  return <div>

    
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
        {cart.shipping.address === "" ? <button onClick={resetAddress}>Edit Address </button>  : null }
          <li>
            <h2>Shipping</h2>
            <h5 id="error"> </h5>
          </li>

          <li>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address"  value={cart.shipping.address? cart.shipping.address : null} onChange={(e) => setAddress(e.target.value)} required>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" value={cart.shipping.city? cart.shipping.city : null} onChange={(e) => setCity(e.target.value)}required>
            </input>
          </li>
          <li>
            <label htmlFor="state">
              State
          </label>
            <input type="text" name="state" id="state" value={cart.shipping.city? cart.shipping.city : null}  onChange={(e) => setState(e.target.value)}required>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
          </label>
            <input type="text" name="postalCode" id="postalCode" value={cart.shipping.postalCode? cart.shipping.postalCode : null} onChange={(e) => setPostalCode(e.target.value)}required>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country"  value={cart.shipping.country? cart.shipping.country : null} onChange={(e) => setCountry(e.target.value)}required>
            </input>
          </li>

          <li>
            <label htmlFor="country">
              Email
          </label>
            <input type="text" name="contact" id="contact" value={cart.shipping.contact? cart.shipping.contact : null} onChange={(e) => setContact(e.target.value)}required>
            </input>
          </li>

          <li>
            <button type="submit" className="button primary">Continue</button>
          </li>

        </ul>
      </form>
    </div>
  </div>

}
export default ShippingScreen;