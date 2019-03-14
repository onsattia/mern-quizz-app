const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateQuestionInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.score = !isEmpty(data.score) ? data.score : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  if (Validator.isEmpty(data.score)) {
    errors.score = "Score field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
