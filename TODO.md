# TODO
# Redux for payment info.
# fetchPriceID fired twice, sending a null string first.
# Prob. useEffect being a bish.
* Logic for clearly indicating Order information
  between Stripe and Website.
* After successful payment, redirect to success page.
* Show how to setup Stripe Product for charging.
 (You need to setup a dummy product for the button to charge to, price to be updated, etc.)
* Load Stripe Button -> 
* Button creates checkout session ->
  (Sends amount, currency, quanity).
*  Backend does some stuff 
* Checkout button redirects to payment page
* Then back to success URL or cancel URL.

https://70p1h.sse.codesandbox.io/
https://github.com/stripe-samples/checkout-one-time-payments

* Categories.
  * Pushes to /category/blah
  * Renders products under category blah
  * Functional, but ugly.  
  * Dynamically load categories?