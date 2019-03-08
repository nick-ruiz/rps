import React, { Component } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Invoice extends Component {
  render() {
    return this.props.invoice.map(inv => (
      <div key={inv._id}>
        <h4>
          Invoice for <Moment format="MM/YYYY">{inv.date}</Moment>
        </h4>
        {inv.status}
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Cost</th>
              <th>
                {inv.status === "UNPAID" ? (
                  <Link
                    className="btn btn-primary btn-sm mr-1"
                    to={`/payment/${this.props.auth.user.id}/${inv._id}`}
                  >
                    Pay ${inv.total}
                  </Link>
                ) : (
                  <button
                    className="btn btn-primary btn-sm mr-1"
                    to={`/payment/${this.props.auth.user.id}/${inv._id}`}
                    disabled
                  >
                    ${inv.total} - {inv.status}
                  </button>
                )}
              </th>
            </tr>
            {inv.services.map(serv => (
              <tr key={serv._id}>
                <td>{serv.service}</td>
                <td>${serv.cost}</td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    ));
  }
}

Invoice.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Invoice);
