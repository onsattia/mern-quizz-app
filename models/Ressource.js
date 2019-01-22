const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});
