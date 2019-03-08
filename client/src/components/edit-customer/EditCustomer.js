import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getInvoiceById,
  addInvoiceById,
  getInvoice,
  deleteInvoice,
  addService
} from "../../actions/invoiceActions";
import { getProfileById } from "../../actions/profileActions";
//import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";
import Spinner from "../common/Spinner";
import EditService from "./EditService";

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.invSubmit = this.invSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getInvoice(this.props.match.params.id);
    this.props.getProfileById(this.props.match.params.id);
    if (this.props.match.params.inv_id) {
      this.props.getInvoiceById(this.props.match.params.inv_id);
    }
  }

  onClick(id, inv_id) {
    this.props.deleteInvoice(id, inv_id);
  }

  markAsPaid(id, inv_id) {
    this.props.addService(id, inv_id, { paid: true });
  }

  // componentDidUpdate(p) {
  //   console.log(this.props);
  //   // console.log(
  //   //   `${p.invoice.invoices.length} - ${this.props.invoice.invoices.length}`
  //   // );
  //   if (p.invoice.invoices.length < this.props.invoice.invoices.length) {
  //     p.invoice.invoices = this.props.invoice.invoices;
  //   }
  // }

  render() {
    const { invoices, invoice } = this.props.invoice;
    const { profile, loading } = this.props.profile;
    const { id, inv_id } = this.props.match.params;

    let dashboardContent;

    if (
      profile === null ||
      loading ||
      this.props.invoice.loading ||
      Object.keys(profile) === 0 ||
      !profile.user
    ) {
      dashboardContent = <Spinner />;
    } else if (inv_id) {
      if (Object.keys(invoice) === 0 || !invoice.user) {
        dashboardContent = <Spinner />;
      } else {
        dashboardContent = (
          <div>
            <EditService id={id} inv_id={inv_id} />
          </div>
        );
      }
    } else {
      dashboardContent = (
        <div>
          <Link to="/dashboard" className="btn btn-light mb-4">
            Go Back
          </Link>
          <h1 className="display-4 text-center mb-4">
            Editing {profile.user.name}
          </h1>
          <form onSubmit={this.invSubmit}>
            <div className="input-group">
              <input
                type="date"
                name="date"
                onChange={this.onChange}
                className="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  id="button-addon2"
                >
                  Add New Invoice
                </button>
              </div>
            </div>
          </form>
          {invoices.map(inv => (
            <div className="mt-4 mb-4" key={inv._id}>
              <h3>
                Invoice for <Moment format="MM/YYYY">{inv.date}</Moment>
              </h3>
              <h5 className="text-right">{`$${inv.total} - ${inv.status}`}</h5>
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Cost</th>
                    <th>
                      <Link
                        className="btn btn-primary btn-sm mr-1"
                        to={`/edit-customer/${profile.user._id}/${inv._id}`}
                      >
                        {inv.status !== "UNPAID" ? "View" : "Edit"}
                      </Link>
                      {inv.status !== "UNPAID" ? null : (
                        <button
                          onClick={this.onClick.bind(
                            this,
                            this.props.match.params.id,
                            inv._id
                          )}
                          className="btn btn-danger btn-sm mr-1"
                        >
                          Delete
                        </button>
                      )}
                      {!inv.paid ? (
                        <button
                          onClick={this.markAsPaid.bind(
                            this,
                            this.props.match.params.id,
                            inv._id
                          )}
                          className="btn btn-secondary btn-sm"
                        >
                          Mark As Paid
                        </button>
                      ) : null}
                    </th>
                    <th />
                  </tr>
                  {inv.services.map(serv => (
                    <tr key={serv._id}>
                      <td>{serv.service}</td>
                      <td>{serv.cost}</td>
                    </tr>
                  ))}
                </thead>
              </table>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }

  invSubmit(e) {
    e.preventDefault();
    const newInv = {
      user: this.props.profile.profile.user._id,
      date: this.state.date
    };
    this.props.addInvoiceById(this.props.match.params.id, newInv);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
}

EditCustomer.propTypes = {
  getInvoice: PropTypes.func.isRequired,
  deleteInvoice: PropTypes.func.isRequired,
  getInvoiceById: PropTypes.func.isRequired,
  addInvoiceById: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
  addService: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  invoice: state.invoice
});

export default connect(
  mapStateToProps,
  {
    getInvoiceById,
    getProfileById,
    addInvoiceById,
    getInvoice,
    deleteInvoice,
    addService
  }
)(withRouter(EditCustomer));
