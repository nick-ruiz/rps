import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Admin extends Component {
  render() {
    const users = this.props.profiles.map(profile => (
      <tr key={profile._id}>
        <td>{profile.user.name}</td>
        <td>{profile.address.formattedAddress}</td>
        <td>
          <Link
            to={`/edit-customer/${profile.user._id}`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Customers</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th />
            </tr>
            {users}
          </thead>
        </table>
      </div>
    );
  }
}

export default connect(null)(Admin);
