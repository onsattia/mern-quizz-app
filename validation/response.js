const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateResponseInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.status = !isEmpty(data.status) ? data.status : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
