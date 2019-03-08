const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// @route POST /questions
// @desc  add question to quiz
// @access Private

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quiz.findOne({ _id: req.params.id })
      .then(() => {
        const newQuestion = new Question({
          quiz: req.params.id,
          title: req.body.title,
          score: req.body.score
        });
        newQuestion
          .save()
          .then(question => res.json(question))
          .catch(err => res.json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route POST questions/response/:questionId
// @desc  add response to questionId
// @access Private

router.post(
  "/response/:questionId",
  //   passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findById(req.params.questionId)
      .then(question => {
        const newResponse = {
          title: req.body.title,
          isTrue: req.body.isTRue
        };
        // Add to responses array
        question.response.push(newResponse);
        question
          .save()
          .then(question => res.json(question))
          .catch(err => res.json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
