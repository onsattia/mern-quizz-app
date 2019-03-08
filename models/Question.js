const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResponseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isTrue: {
    type: Boolean
    // required: true
  }
});

const QuestionSchema = new Schema({
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "quizzes"
  },
  title: {
    type: String,
    required: true
  },
  response: [ResponseSchema],
  score: {
    type: Number,
    required: true
  }
});

module.exports = Question = mongoose.model("questions", QuestionSchema);
