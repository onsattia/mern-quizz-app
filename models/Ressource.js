const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RessourceSchema = new Schema({
  label: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

module.exports = Ressource = mongoose.model("ressources", RessourceSchema);
