const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
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
  }
});

module.exports = Quizz = mongoose.model("quiz", QuizSchema);
