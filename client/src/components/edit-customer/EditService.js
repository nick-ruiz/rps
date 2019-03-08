import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {
  addService,
  getInvoice,
  deleteService
} from "../../actions/invoiceActions";

class EditService extends Component {
  constructor() {
    super();
    this.state = {
      service: "",
      cost: 0,
      paid: false
    };
    this.servSubmit = this.servSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  servSubmit(e) {
    e.preventDefault();
    const newServ = {
      service: this.state.service,
      cost: this.state.cost
    };
    this.props.addService(this.props.id, this.props.inv_id, newServ);
  }

  onClick(id, inv_id, serv_id) {
    this.props.deleteService(id, inv_id, serv_id);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { id } = this.props;
    const { invoice } = this.props.invoice;
    const editable = invoice.status !== "PAID";
    return (
      <div>
        <Link to={`/edit-customer/${id}`} className="btn btn-light mb-4">
          Go Back
        </Link>
        <h3>
          Invoice for <Moment format="MM/YYYY">{invoice.date}</Moment>
        </h3>
        <h1 className="display-4 text-center mb-4">
          Add service for {invoice.user.name}
        </h1>
        {editable ? (
          <form onSubmit={this.servSubmit}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">Service</span>
              </div>
              <input
                type="text"
                name="service"
                onChange={this.onChange}
                aria-label="service"
                className="form-control"
              />
              <div className="input-group-prepend ml-2">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="text"
                name="cost"
                onChange={this.onChange}
                aria-label="Cost"
                className="form-control"
              />
              <button
                className="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Submit
              </button>
            </div>
          </form>
        ) : null}
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Cost</th>
              <th>
                {invoice.paid
                  ? `$${invoice.total} - PAID`
                  : `$${invoice.total} - ${invoice.status}`}
              </th>
              <th />
            </tr>
            {invoice.services.map(serv => (
              <tr key={serv._id}>
                <td>{serv.service}</td>
                <td>${serv.cost}</td>
                {editable ? (
                  <td>
                    <button
                      onClick={this.onClick.bind(
                        this,
                        id,
                        invoice._id,
                        serv._id
                      )}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

EditService.propTypes = {
  addService: PropTypes.func.isRequired,
  getInvoice: PropTypes.func.isRequired,
  deleteService: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  invoice: state.invoice
});

export default connect(
  mapStateToProps,
  { addService, getInvoice, deleteService }
)(EditService);
