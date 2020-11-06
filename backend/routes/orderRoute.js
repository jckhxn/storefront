import express from "express";
import Order from "../models/orderModel";
import { isAuth, isAdmin } from "../util";
import Axios from "axios";
require("dotenv").config({ path: "../../.env" });

const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);





router.post("/webhook", async (req, res) => {
  const event = req.body;

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      
      console.log("OrderID  : ",session.client_reference_id);
      console.log("Auth token: ",event.data.object.metadata.auth);
      try {
      const { data } = await Axios.put(`${process.env.DOMAIN}/api/orders/` + session.client_reference_id + "/pay", {isPaid:"true"}, {
        headers:
          { Authorization: 'Bearer ' + event.data.object.metadata.auth }
      });
      console.log(data);
    } 
    catch(error)
    {
      console.log(error.message);
    }
      break;

    default:
      console.log("Unknown event type: " + event.type);
  }

  res.send({ message: "success" });
});

router.post("/price", async (req, res) => {
  if (req.body.unitAmount === null) {
    console.log("received null");
  } else {
    try {
      const priceID = await stripe.prices.create({
        unit_amount: req.body.unitAmount,
        currency: req.body.currency,
        product: req.body.product,
      });
      if (priceID) {
        res.send(priceID);
        process.env.PRICE = priceID.id;
        // console.log(process.env.PRICE);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
});
router.get("/config", async (req, res) => {
  const price = await stripe.prices.retrieve(process.env.PRICE);

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
  });
});

// Fetch the Checkout Session to display the JSON result on the success page
router.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

router.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const { quantity, locale, email, items, orderID,userToken } = req.body;

 
  // Receive an array of objects for line_items.

  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: process.env.PAYMENT_METHODS.split(", "),
    mode: "payment",
    locale: locale,
    line_items: items,
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    metadata:{"auth":userToken},
    customer_email: email,
    client_reference_id:orderID,
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}success/?order_id=${orderID}`,
    cancel_url: `${domainURL}cart`,
  });
  
  res.send({
    sessionId: session.id,
  });
});

// May not be needed.
router.post("/checkout", async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const { quantity, locale } = req.body;
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: process.env.PAYMENT_METHODS.split(", "),
    mode: "payment",
    locale: locale,
    line_items: [
      {
        price: process.env.PRICE,
        quantity: quantity,
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`,
  });

  res.send({
    sessionId: session.id,
  });
});
router.post("/charge", async (req, res) => {
  const { id, amount } = req.body;
  try {
    // Send customer name, items, address.
    // Description gives Name & Order ID or Date?
    // receipt_email, shipping,
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Jack, Order 1, July 11th 2019",
      payment_method: id,
      confirm: true,
    });
    console.log(payment);
    return res.status(200).json({
      confirm: "CONFIRMED",
    });
  } catch (error) {
    console.log(error);
  }
});
router.get("/", isAuth, async (req, res) => {
  const orders = await Order.find({}).populate("user");
  res.send(orders);
});
router.get("/mine", isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

router.get("/:id", isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send("Order Not Found.");
  }
});

router.post("/", isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await newOrder.save();
  res.status(201).send({ message: "New Order Created", data: newOrderCreated });
});

router.put("/:id/pay", isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: "paypal",
      paymentResult: {
        payerID: req.body.payerID,
        orderID: req.body.orderID,
        paymentID: req.body.paymentID,
      },
    };
    const updatedOrder = await order.save();
    res.send({ message: "Order Paid.", order: updatedOrder });
  } else {
    res.status(404).send({ message: "Order not found." });
  }
});

export default router;
