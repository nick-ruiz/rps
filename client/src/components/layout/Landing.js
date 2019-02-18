import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4 text-dark">
                  Rick's Pool Service
                </h1>
                <p className="lead text-dark">
                  Login or Register to check your billing information.
                </p>
                <div className="mt-5">
                  <Link
                    to="/login"
                    className="btn btn-light btn-outline-dark mr-2"
                  >
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-dark">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
