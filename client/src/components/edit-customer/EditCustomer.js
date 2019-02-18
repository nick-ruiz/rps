import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getInvoiceById,
  addInvoiceById,
  getInvoice
} from "../../actions/invoiceActions";
import { getProfileById } from "../../actions/profileActions";
//import isEmpty from "../../validation/is-empty";
import Moment from "react-moment";
import Spinner from "../common/Spinner";

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: "",
      cost: "",
      paid: "",
      date: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.invSubmit = this.invSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getInvoice(this.props.match.params.id);
    this.props.getProfileById(this.props.match.params.id);
    // if (this.props.match.params.id) {
    //   this.props.getInvoice(this.props.match.params.id);
    // }
    if (this.props.match.params.inv_id) {
      this.props.getInvoiceById(this.props.match.params.inv_id);
    }
  }

  render() {
    //const { errors } = this.state;
    const { invoice } = this.props.invoice;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (
      profile === null ||
      loading ||
      this.props.invoice.loading ||
      Object.keys(profile) === 0 ||
      !profile.user
    ) {
      dashboardContent = <Spinner />;
    } else if (true) {
      dashboardContent = (
        <div>
          <Link to="/dashboard" className="btn btn-light mb-4">
            Go Back
          </Link>
          <h1 className="display-4 text-center mb-4">
            Edit {profile.user.name}
          </h1>
          <form>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Service</span>
              </div>
              <input
                type="text"
                aria-label="service"
                className="form-control"
              />
              <div className="input-group-prepend ml-2">
                <span className="input-group-text">$</span>
              </div>
              <input type="text" aria-label="Cost" className="form-control" />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                Submit
              </button>
            </div>
          </form>

          {invoice.map(inv => (
            <div className="mt-4 mb-4" key={inv._id}>
              <h3>
                Invoice for <Moment format="MM/YYYY">{inv.date}</Moment>
              </h3>
              <table className="table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Cost</th>
                    <th>Paid</th>
                    <th>
                      <Link
                        className="btn btn-primary btn-sm mr-1"
                        to={`/edit-customer/${profile.user._id}/${inv._id}`}
                      >
                        Edit
                      </Link>
                      <button className="btn btn-danger btn-sm">Delete</button>
                    </th>
                    <th />
                  </tr>
                  {inv.services.map(serv => (
                    <tr key={serv._id}>
                      <td>{serv.service}</td>
                      <td>{serv.cost}</td>
                      <td>{serv.paid ? "Yes" : "No"}</td>
                    </tr>
                  ))}
                </thead>
              </table>
            </div>
          ))}
        </div>
      );
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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }

  //   if (nextProps.profile.profile) {
  //     const profile = nextProps.profile.profile;

  //     // If profile field doesn't exist, make empty string
  //     profile.service = !isEmpty(profile.service) ? profile.service : "";
  //     profile.cost = !isEmpty(profile.cost) ? profile.cost : "";

  //     // Set component fields state
  //     this.setState({
  //       service: profile.service,
  //       cost: profile.cost,
  //       paid: profile.paid
  //     });
  //   }
  // }

  invSubmit(e) {
    e.preventDefault();
    const newInv = {
      user: this.props.profile.profile.user._id,
      date: this.state.date
    };
    this.props.addInvoiceById(this.props.match.params.id, newInv);
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      service: this.state.service,
      cost: this.state.cost,
      paid: this.state.paid
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
}

EditCustomer.propTypes = {
  getInvoice: PropTypes.func.isRequired,
  getInvoiceById: PropTypes.func.isRequired,
  addInvoiceById: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
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
  { getInvoiceById, getProfileById, addInvoiceById, getInvoice }
)(withRouter(EditCustomer));
