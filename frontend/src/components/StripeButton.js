import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  PaymentRequestButtonElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Axios from "axios";
const stripePromise = loadStripe(
  "pk_test_51H7QRTAMLmRApP8Roa7Xlam21v5rS8Ih9mBcf7JnpMMdIL1GjElxagVHpDKjdisNGwz2xjCOAMWfrsXIhaeEZ8Fv00RWISGQrw"
);
const CheckoutForm = ({ success }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      try {
        const { data } = await Axios.post("/api/orders/charge", {
          id,
          amount: 1099,
        });
        success();
      } catch (error) {
        console.log(error);
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <CardElement/>
      <button type="submit" disabled={!stripe}>
        Submit
      </button>
      
    </form>
  );
};
export default function StripeButton() {
  const [status, setStatus] = useState(false);
  return (
    <Elements stripe={stripePromise}>
      
      <CheckoutForm
        success={() => {
          setStatus(true);
        }}
      />
    </Elements>
  );
}
