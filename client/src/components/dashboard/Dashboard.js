import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { getInvoices } from "../../actions/invoiceActions";
import { getProfiles } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import Invoice from "./Invoice";
import Admin from "./Admin";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.auth.user.admin) {
      this.props.getProfiles();
    } else {
      this.props.getCurrentProfile();
      this.props.getInvoices();
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile, profiles, loading } = this.props.profile;
    const { invoices } = this.props.invoice;

    let dashboardContent;

    if (user.admin) {
      dashboardContent = <Admin profiles={profiles} />;
    } else if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        if (invoices.length > 0) {
          dashboardContent = (
            <div>
              <p className="lead text-muted"> Welcome {user.name}</p>
              {invoices ? <Invoice invoice={invoices} /> : null}
            </div>
          );
        } else {
          dashboardContent = <div>You have no invoices</div>;
        }
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted"> Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getInvoices: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  invoice: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  invoice: state.invoice
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getInvoices, getProfiles }
)(Dashboard);
