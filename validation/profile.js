const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.streetNumber = !isEmpty(data.streetNumber) ? data.streetNumber : "";
  data.streetName = !isEmpty(data.streetName) ? data.streetName : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.zipCode = !isEmpty(data.zipCode) ? data.zipCode : "";

  if (Validator.isEmpty(data.streetNumber)) {
    errors.streetNumber = "Street number is required";
  }

  if (Validator.isEmpty(data.streetName)) {
    errors.streetName = "Street name is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City is required";
  }

  if (Validator.isEmpty(data.zipCode)) {
    errors.zipCode = "Zip code is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
