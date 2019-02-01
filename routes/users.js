const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../config/keys");

// Load input valudation

const validateRegisterInput = require("../validation/register");

const User = require("../models/User");

// @route GET users/
// @desc get all users
// @access Private

router.get("/", (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ noUserFound: "No user found" }));
});

// @route GET user/:id
// @desc  Get user by id
// @access Private

// router.get(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     User.findById(req.params.id)
//       .then(user => res.json(user))
//       .catch(err =>
//         res.status(404).json({ noUserFound: "No user found with this ID" })
//       );
//   }
// );

// @route POST users/register
// @desc  Register user
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
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
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST users/login
// @desc  Login user && returning JWT Token
// @access Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ UserNotFoundError: "User not found" });
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
        return res
          .status(400)
          .json({ passwordError: "Password doesn't match" });
      }
    });
  });
});

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    );
  }
);

module.exports = router;
