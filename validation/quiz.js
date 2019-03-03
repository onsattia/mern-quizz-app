const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateQuizInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.track = !isEmpty(data.track) ? data.track : "";
  data.level = !isEmpty(data.level) ? data.level : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }
  if (Validator.isEmpty(data.track)) {
    errors.track = "Track field is required";
  }
  if (Validator.isEmpty(data.level)) {
    errors.level = "Level field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
