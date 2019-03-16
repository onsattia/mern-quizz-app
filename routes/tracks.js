const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load validation
const validateTrackInput = require("../validation/track");

const Track = require("../models/Track");
const Quiz = require("../models/Quiz");

// @route GET /tracks
// @desc  Get all Tracks
// @access Public

router.get("/", (req, res) => {
  Track.find()
    .then(tracks => res.json(tracks))
    .catch(err => res.status(404).json({ noTrackFound: "No track found" }));
});

// @route GET /tracks/:id
// @desc  Get Track by id
// @access Public

router.get("/:id", (req, res) => {
  Track.findById(req.params.id)
    .then(track => res.json(track))
    .catch(err => res.status(404).json({ noTrackFound: "No track found" }));
});

// @route GET /tracks/quiz/:id
// @desc  Get Quizzes by Track
// @access Public

router.get("/quizzes/:id", (req, res) => {
  Track.findById(req.params.id)
    .then(track =>
      Quiz.find({ track: track.name }).then(quizzes => {
        res.json(quizzes);
      })
    )
    .catch(err => res.status(404).json({ noTrackFound: "No track found" }));
});

// @route POST /tracks
// @desc  Create track
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTrackInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTrack = new Track({
      name: req.body.name
    });

    newTrack.save().then(track => res.json(track));
  }
);

// @route PUT /tracks/:id
// @desc  Update track
// @access Private

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTrackInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Track.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
      Track.findOne({ _id: req.params.id }).then(track => {
        res.send(track);
      });
    });
  }
);

// @route DELETE /tracks/:id
// @desc  Delete track
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Track.findOneAndDelete({ _id: req.params.id })
      .then(() =>
        Track.find().then(track => {
          res.json(track);
        })
      )
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
