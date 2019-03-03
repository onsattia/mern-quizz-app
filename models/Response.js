const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ResponseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  isTrue: {
    type: Boolean,
    required: true
  }
});

module.exports = Response = mongoose.model("responses", ResponseSchema);
