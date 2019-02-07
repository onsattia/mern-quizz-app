const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateQuizInput(data) {
  let errors = {};

  data.question = !isEmpty(data.question) ? data.question : "";
  data.answers = !isEmpty(data.answers) ? data.answers : "";
  data.points = !isEmpty(data.points) ? data.points : "";

  if (Validator.isEmpty(data.question)) {
    errors.question = "Question field is required";
  }
  if (Validator.isEmpty(data.answers)) {
    errors.answers = "Answer field is required";
  }
  if (Validator.isEmpty(data.points)) {
    errors.points = "Points field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
