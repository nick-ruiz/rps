import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
const STRIPE_API_KEY = require("../../config/keys").STRIPE_API_KEY;

class Payment extends Component {
  render() {
    return (
      <StripeProvider apiKey={STRIPE_API_KEY}>
        <div className="example">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    );
  }
}

export default Payment;
