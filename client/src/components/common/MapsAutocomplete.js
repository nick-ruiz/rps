import React, { Component } from "react";
import Script from "react-load-script";
import { GOOGLE_API_KEY } from "../../config/keys_dev";

class MapsAutocomplete extends Component {
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      streetNumber: "",
      streetName: "",
      city: "",
      zipCode: "",
      query: "",
      errors: ""
    };
    // Bind Functions
    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.onChange = this.onChange.bind(this);
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
    console.log(address);
    // Check if address is valid
    if (address) {
      // Set State
      this.setState({
        streetNumber: address[0].long_name,
        streetName: address[1].long_name,
        city: address[2].long_name,
        zipCode: address[6].long_name,
        query: addressObject.formatted_address
      });
    } else {
      //console.log(address);
      this.setState({ errors: "invalid address" });
    }
  }

  onChange(e) {
    this.setState({ locality: this.query });
  }

  render() {
    return (
      <div>
        <form>
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
          {this.state.errors && (
            <div className="invalid-feedback">{this.state.errors}</div>
          )}
        </form>
      </div>
    );
  }
}

export default MapsAutocomplete;
