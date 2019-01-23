const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuizzSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answers: {
    type: [String],
    required: true
  },
  points: {
    type: Number,
    required: true
  }
});

module.exports = Quizz = mongoose.model("quizz", QuizzSchema);
