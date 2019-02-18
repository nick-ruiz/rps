const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateInvoiceInput(data) {
  let errors = {};

  if (data.cost || data.service) {
    data.cost = !isEmpty(data.cost) ? data.cost : "";
    data.service = !isEmpty(data.service) ? data.service : "";

    if (!Validator.isDecimal(data.cost)) {
      errors.cost = "Must be a number";
    }

    if (Validator.isEmpty(data.cost)) {
      errors.cost = "Cost is required";
    }

    if (Validator.isEmpty(data.service)) {
      errors.service = "Service is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
