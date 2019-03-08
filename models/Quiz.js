const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  track: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  image: {
    type: String
  }
});

module.exports = Quiz = mongoose.model("quizzes", QuizSchema);
