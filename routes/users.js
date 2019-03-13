const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

// Load validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateUserInput = require("../validation/user");

const User = require("../models/User");

// @route GET users/
// @desc get all users
// @access Private

router.get("/", (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ noUserFound: "No user found" }));
});

// @route GET users/:id
// @desc  Get user by id
// @access Private

router.get(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err =>
        res.status(404).json({ noUserFound: "No user found with this ID" })
      );
  }
);

// @route POST users/register
// @desc  Register user
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm"
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.send(err));
        });
      });
    }
  });
});

// @route POST users/login
// @desc  Login user && returning JWT Token
// @access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Sign token
        jwt.sign(
          { id: user.id, name: user.name },
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
        errors.password = "Password doesn't match";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route PUT users/edit/:id
// @desc  Update quizz
// @access Private

router.put(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
      User.findOne({ _id: req.params.id }).then(user => {
        res.send(user);
      });
    });
  }
);

// @route   DELETE users/:id
// @desc    Delete user
// @access  Private
router.delete(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndDelete({ _id: req.params.id }).then(() =>
      User.find().then(user => {
        res.json(user);
      })
    );
  }
);

module.exports = router;
