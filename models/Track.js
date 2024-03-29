const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = Track = mongoose.model("tracks", TrackSchema);
