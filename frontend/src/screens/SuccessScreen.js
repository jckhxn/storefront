import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { payOrder } from '../actions/orderActions';

const divStyle = {
   textAlign:"center"
}

function SuccessScreen() {

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;
  const dispatch = useDispatch();
  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }


  return (
      <div style={divStyle}>
        
          <h1 >Payment Success</h1>
    <h3>You will receive an email receipt shortly.</h3>
        {setTimeout(() => { window.location.href = '/'},3000)}
      </div>
    
  )
}
export default SuccessScreen;
