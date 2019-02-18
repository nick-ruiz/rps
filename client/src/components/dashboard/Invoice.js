import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";

class Invoice extends Component {
  render() {
    return this.props.invoice.map(inv => (
      <div key={inv._id}>
        <h4>
          Invoice for <Moment format="MM/YYYY">{inv.date}</Moment>
        </h4>
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Cost</th>
              <th>Paid</th>
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
    ));
  }
}

export default connect(null)(Invoice);
