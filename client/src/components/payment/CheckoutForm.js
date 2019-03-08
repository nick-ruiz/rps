import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { addService, getInvoiceById } from "../../actions/invoiceActions";
import axios from "axios";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";
import moment from "moment";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false, loading: false, amount: 0, desc: "" };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    const { invoice } = this.props.invoice;
    this.setState({
      amount: invoice.total,
      desc: `${invoice.user.name} - ${moment(invoice.date).format("MM/YY")}`,
      loading: true
    });
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    axios
      .post("/api/payment/charge", {
        amount: this.state.amount * 100,
        desc: this.state.desc,
        source: token.id
      })
      .then(res => {
        //return res.data;
        if (res.data.status === "succeeded") {
          this.props.addService(
            this.props.match.params.id,
            this.props.match.params.inv_id,
            { status: "PENDING" }
          );
          this.setState({ complete: true, loading: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    this.props.getInvoiceById(this.props.match.params.inv_id);
  }

  render() {
    const { invoice } = this.props.invoice;
    if (Object.keys(invoice) === 0 || isEmpty(invoice)) return <Spinner />;

    return (
      <div className="checkout">
        <div className="col-md-12">
          <p className="display-4 text-center mt-4 pb-4">
            Would you like to complete the purchase?
          </p>
          <div className="col-md-4 mx-auto">
            <div className="card card-body bg-light mb-3">
              {this.state.complete ? (
                <div>
                  <h1 className="display-4 text-center">SUCCESS</h1>
                  <Link to="/dashboard" className="btn btn-secondary btn-sm">
                    Go Back
                  </Link>
                </div>
              ) : (
                <div>
                  <CardElement />
                  <button
                    className="btn btn-primary btn-sm mt-2"
                    onClick={this.submit}
                    disabled={this.state.loading}
                  >
                    Pay
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 mx-auto">
            <div className="card card-body bg-light mb-3">
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Service</th>
                      <th>Cost</th>
                    </tr>
                    {invoice.services.map(serv => (
                      <tr key={serv._id}>
                        <td>{serv.service}</td>
                        <td>{serv.cost}</td>
                      </tr>
                    ))}
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CheckoutForm.propTypes = {
  addService: PropTypes.func.isRequired,
  getInvoiceById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  invoice: state.invoice
});

export default connect(
  mapStateToProps,
  { addService, getInvoiceById }
)(withRouter(injectStripe(CheckoutForm)));
