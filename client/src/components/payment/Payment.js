import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import { STRIPE_API_KEY } from "../../config/keys_dev";

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
