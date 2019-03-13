const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const multer = require("multer");

// Load validation
const validateQuizInput = require("../validation/quiz");

const Quiz = require("../models/Quiz");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // accept only jpeg & png files
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// @route GET quizzes/
// @desc  Get all quizzes
// @access Public

router.get("/", (req, res) => {
  Quiz.find()
    .then(quizzes => res.json(quizzes))
    .catch(err => res.status(404).json({ noQuizFound: "No quiz found" }));
});

// @route GET quizzes/:id
// @desc  Get quiz by id
// @access Public

router.get("/:id", (req, res) => {
  Quiz.findById(req.params.id)
    .then(quiz => res.json(quiz))
    .catch(err =>
      res.status(404).json({ noQuizFound: "No quiz found with this ID" })
    );
});

// @route POST quizzes/
// @desc  Create quiz
// @access Private

router.post(
  "/",
  upload.single("image"),
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("file  " + req.file.path);

    const { errors, isValid } = validateQuizInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newQuiz = new Quiz({
      title: req.body.title,
      description: req.body.description,
      track: req.body.track,
      level: req.body.level,
      image: req.file.path
    });

    newQuiz
      .save()
      .then(quiz => res.json(quiz))
      .catch(err => res.json(err));
  }
);

// @route PUT quizzes/:id
// @desc  Update quiz
// @access Private

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quiz.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
      Quiz.findOne({ _id: req.params.id }).then(quiz => {
        res.send(quiz);
      });
    });
  }
);

// @route DELETE quizzes/:id
// @desc  delete quiz
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Quiz.findOneAndDelete({ _id: req.params.id })
      .then(() =>
        Quiz.find().then(quizzes => {
          res.json(quizzes);
        })
      )
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
