const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load validation
const validateQuestionInput = require("../validation/question");
const validateResponseInput = require("../validation/response");

const Quiz = require("../models/Quiz");
const Question = require("../models/Question");

// @route GET /questions/:quizId
// @desc  Get question by quizId
// @access Private

router.get(
  "/:quizId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quiz.findOne({ _id: req.params.quizId })
      .then(quiz => {
        Question.find({ quiz: quiz._id })
          .then(questions => res.json(questions))
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET /questions/question/:qstId
// @desc  Get question by qstId
// @access Private

router.get(
  "/question/:qstId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findById(req.params.qstId)
      .then(question => res.json(question))
      .catch(err =>
        res.status(404).json({ noQuestionFound: "No question found" })
      );
  }
);

// @route GET /questions/responses/:qstId
// @desc  Get responses of question with qstId
// @access Private

router.get(
  "/responses/:qstId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findOne({ _id: req.params.qstId })
      .then(question =>
        res.json({ responses: question.response, quizId: question.quiz })
      )
      .catch(err =>
        res.status(404).json({ noQuestionFound: "No question found" })
      );
  }
);

// @route GET /questions/response/:resId
// @desc  Get response of question with resId
// @access Private

router.get(
  "/response/:resId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findOne({ "response._id": req.params.resId })
      .then(question => {
        let response = question.response.find(
          res => res._id == req.params.resId
        );
        res.json({ response: response, qstId: question._id });
      })
      .catch(err => res.json(err));
  }
);

// @route POST /questions/:quizId
// @desc  Add question to quiz
// @access Private

router.post(
  "/:quizId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateQuestionInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Quiz.findOne({ _id: req.params.quizId })
      .then(() => {
        const newQuestion = new Question({
          quiz: req.params.quizId,
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

// @route POST /questions/response/:qstId
// @desc  Add response to question
// @access Private

router.post(
  "/response/:qstId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateResponseInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Question.findById(req.params.qstId)
      .then(question => {
        const newResponse = {
          title: req.body.title,
          status: req.body.status
        };
        // Add to response array
        question.response.push(newResponse);
        question
          .save()
          .then(question => res.json(question))
          .catch(err => res.json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route PUT /questions/:id
// @desc  Update question
// @access Private

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateQuestionInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Question.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => {
        Question.findOne({ _id: req.params.id })
          .then(question => res.send(question))
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE /questions/:id
// @desc  Delete question
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findOneAndDelete({ _id: req.params.id })
      .then(() =>
        Question.find()
          .then(question => res.json(question))
          .catch(err => res.status(404).json(err))
      )
      .catch(err => res.status(404).json(err));
  }
);

// @route PUT /questions/response/:resId
// @desc  Update response of the question with the id :resId
// @access Private

router.put(
  "/response/:resId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateResponseInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Question.findOneAndUpdate(
      { "response._id": req.params.resId },
      {
        $set: {
          "response.$.title": req.body.title,
          "response.$.status": req.body.status
        }
      }
    )
      .then(() => {
        Question.findOne({ "response._id": req.params.resId })
          .then(question => res.send(question))
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route DELETE /questions/response/:id
// @desc  Delete response
// @access Private

router.delete(
  "/response/:resId/:qstId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Question.findOneAndUpdate(
      { "response._id": req.params.resId },
      { $pull: { response: { _id: req.params.resId } } }
    )
      .then(() => {
        Question.findOne({ _id: req.params.qstId })
          .then(question =>
            res.json({ responses: question.response, quizId: question.quiz })
          )
          .catch(err => res.status(404).json(err));
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
