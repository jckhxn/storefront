# TODO
# Stripe button doesn't work on live site.
 * Tried Ngrok, DEF need HTTPS lol.
# Add Product adds to MongoDB and Stripe.

# Setting Price on Stripe makes it difficult to delete.
# Shares ID.

# You create an array of objects for each item.
# Get Price ID for each item in cart.
* list_items: [
   {PRICE_ID 
   QUANTITY}
   ,
   {SECOND_PRICE_ID,
   QUANITY}];

# Send automatic receipts
(https://dashboard.stripe.com/settings/emails)
# Domain URL is currently hard coded.  
# Handle Successful Payment.
 * (WEBHOOKS!)

  
# Set redirect URLs correctly Checkout/Cancel


# Client Side
 Name, Date, Order ID, Paid or Not, Delivered, Delivery Date.

 # Stripe 
 Order ID, Name, Address, Paid Status.

https://70p1h.sse.codesandbox.io/
https://github.com/stripe-samples/checkout-one-time-payments

* Categories.
  * Pushes to /category/blah
  * Renders products under category blah
  * Functional, but ugly.  
  * Dynamically load categories?