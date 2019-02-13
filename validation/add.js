const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.streetNumber = !isEmpty(data.streetNumber) ? data.streetNumber : "";
  data.streetName = !isEmpty(data.streetName) ? data.streetName : "";
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!Validator.isInt(data.streetNumber)) {
    errors.streetNumber = "Must be a number";
  }

  if (Validator.isEmpty(data.streetNumber)) {
    errors.streetNumber = "Street number is required";
  }

  if (Validator.isEmpty(data.streetName)) {
    errors.streetName = "Street name is required";
  }

  if (!Validator.isInt(data.zipCode)) {
    errors.zipCode = "Must be a number";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
