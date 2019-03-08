import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Script from "react-load-script";
import { createProfile } from "../../actions/profileActions";
const GOOGLE_API_KEY = require("../../config/keys").GOOGLE_API_KEY;

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formattedAddress: "",
      streetNumber: "",
      streeName: "",
      city: "",
      zipCode: "",
      errors: {}
    };
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      types: ["address"]
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        formattedAddress: addressObject.formatted_address,
        streetNumber: address[0].long_name,
        streetName: address[1].long_name,
        city: address[2].long_name,
        zipCode: address[6].long_name,
        query: addressObject.formatted_address
      });
    } else {
      //console.log(address);
      this.setState({ "errors.address": "invalid address" });
    }
  }

  onChange(e) {
    this.setState({ locality: this.query });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center mt-4 pb-4">Last step...</h1>
              <p className="lead text-center">
                Enter your address to access your billing information.
              </p>
              <form onSubmit={this.onSubmit}>
                <Script
                  url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
                  onLoad={this.handleScriptLoad}
                />
                <input
                  id="autocomplete"
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={this.state.locality}
                  onChange={this.onChange}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address}</div>
                )}
                <div className="mt-2">
                  <button className="btn btn-outline-dark" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const profileData = {
      formattedAddress: this.state.formattedAddress,
      streetNumber: this.state.streetNumber,
      streetName: this.state.streetName,
      city: this.state.city,
      zipCode: this.state.zipCode
    };

    this.props.createProfile(profileData, this.props.history);
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
