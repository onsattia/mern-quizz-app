const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load validation
const validateRessourceInput = require("../validation/ressource");

const Ressource = require("../models/Ressource");

// @route GET ressources/
// @desc  Get all ressources
// @access Private

router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Ressource.find()
      .then(ressources => res.json(ressources))
      .catch(err =>
        res.status(404).json({ noRessourceFound: "No ressource found" })
      );
  }
);

// @route GET ressources/:id
// @desc  Get ressource by id
// @access Private

router.get(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Ressource.findById(req.params.id)
      .then(ressource => res.json(ressource))
      .catch(err =>
        res
          .status(404)
          .json({ noRessourceFound: "No Ressource found with this ID" })
      );
  }
);

// @route POST ressources/
// @desc  Create ressource
// @access Private

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateQuizInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newRessource = new Ressource({
      label: req.body.label,
      link: req.body.link
    });

    newRessource.save().then(ressource => res.json(ressource));
  }
);

// @route PUT ressources/:id
// @desc  Update ressource
// @access Private

router.put(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Ressource.findOneAndReplace({ _id: req.params.id }, req.body).then(
      ressource => {
        Ressource.findOne({ _id: req.params.id }).then(ressource => {
          res.send(ressource);
        });
      }
    );
  }
);

// @route DELETE ressources/:id
// @desc  delete ressource
// @access Private

router.delete(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Ressource.findOneAndDelete({ _id: req.params.id })
      .then(() =>
        Ressource.find().then(ressource => {
          res.json(ressource);
        })
      )
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
