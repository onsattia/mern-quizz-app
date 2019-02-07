const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRessourceInput(data) {
  let errors = {};

  data.label = !isEmpty(data.label) ? data.label : "";
  data.link = !isEmpty(data.link) ? data.link : "";

  if (Validator.isEmpty(data.label)) {
    errors.label = "Label field is required";
  }
  if (Validator.isEmpty(data.link)) {
    errors.link = "Link field is required";
  }
  if (!Validator.isURL(data.link)) {
    errors.link = "Not a valid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
