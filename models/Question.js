const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  response: {
    type: Schema.Types.ObjectId,
    ref: "responses"
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = Question = mongoose.model("questions", QuestionSchema);
