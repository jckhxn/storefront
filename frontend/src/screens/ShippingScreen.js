import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import Cookie from 'js-cookie';


function ShippingScreen(props) {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [contact, setContact] = useState('');
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
 
    if(!Cookie.get("shipping"))
    {
    Cookie.set("shipping",{});
    }
  const getShippingCookie  = JSON.parse(Cookie.get("shipping"));



  const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(saveShipping({ address, city,state, postalCode, country , contact}));
    props.history.push('payment');
    Cookie.set("shipping",JSON.stringify({ address, city,state, postalCode, country , contact}));
  }
  return <div>

  
    <CheckoutSteps step1 step2 ></CheckoutSteps>
    <div className="form">
      <form onSubmit={submitHandler} >
        <ul className="form-container">
          <li>
            <h2>Shipping</h2>
          </li>

          <li>
            <label htmlFor="address">
              Address
          </label>
            <input type="text" name="address" id="address" value={getShippingCookie? getShippingCookie.address: ""} onChange={(e) => setAddress(e.target.value)} required>
            </input>
          </li>
          <li>
            <label htmlFor="city">
              City
          </label>
            <input type="text" name="city" id="city" value={getShippingCookie? getShippingCookie.city: ""} onChange={(e) => setCity(e.target.value)}required>
            </input>
          </li>
          <li>
            <label htmlFor="state">
              State
          </label>
            <input type="text" name="state" id="state" value={getShippingCookie? getShippingCookie.state: ""}  onChange={(e) => setState(e.target.value)}required>
            </input>
          </li>
          <li>
            <label htmlFor="postalCode">
              Postal Code
          </label>
            <input type="text" name="postalCode" id="postalCode" value={getShippingCookie? getShippingCookie.postalCode : ""} onChange={(e) => setPostalCode(e.target.value)}required>
            </input>
          </li>
          <li>
            <label htmlFor="country">
              Country
          </label>
            <input type="text" name="country" id="country" value={getShippingCookie? getShippingCookie.country: ""} onChange={(e) => setCountry(e.target.value)}required>
            </input>
          </li>

          <li>
            <label htmlFor="country">
              Email
          </label>
            <input type="text" name="contact" id="contact" value={getShippingCookie? getShippingCookie.contact: ""} onChange={(e) => setContact(e.target.value)}required>
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