
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { payOrder } from '../actions/orderActions';
const divStyle = {
   textAlign:"center"
}

function SuccessScreen() {


  return (
      <div style={divStyle}>
        
          <h1 >Payment Success</h1>
    <h3>You will receive an email receipt shortly.</h3>
        {setTimeout(() => { window.location.href = '/'},3000)}
      </div>
    
  )
}
export default SuccessScreen;
