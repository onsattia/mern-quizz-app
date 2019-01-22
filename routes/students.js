const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const Student = require("../models/Student");

// @route GET students/
// @desc
// @access Public
router.get("/", (req, res) => {
  res.json({ msg: "Students Works" });
});

// @route POST students/register
// @desc  Register student
// @access Public
router.post("/register", (req, res) => {
  Student.findOne({ email: req.body.email }).then(student => {
    if (student) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newStudent = new Student({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newStudent.password, salt, (err, hash) => {
          if (err) throw err;
          newStudent.password = hash;
          newStudent
            .save()
            .then(student => res.json(student))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST students/login
// @desc  Login student && returning JWT Token
// @access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find student by email
  Student.findOne({ email }).then(student => {
    if (!student) {
      return res
        .status(404)
        .json({ StudentNotFoundError: "Student not found" });
    }
    bcrypt.compare(password, student.password).then(isMatch => {
      if (isMatch) {
        // Sign token
        jwt.sign(
          { id: student.id, name: student.name },
          keys.secretKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordError: "Password doesn't match" });
      }
    });
  });
});

router.delete("/:id", (req, res) => {
  res.send({ type: "DELETE" });
});

// @route POST students/current
// @desc  Return current student
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.student);
  }
);

module.exports = router;
