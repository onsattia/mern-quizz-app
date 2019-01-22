const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  answers: {
    type: [String],
    required: true
  },
  point: {
    type: Number,
    required: true
  }
});
