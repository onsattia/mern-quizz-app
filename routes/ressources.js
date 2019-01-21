const express = require("express");
const router = express.Router();

// @route GET ressources/
// @access Private
router.get("/", (req, res) => {
  res.json({ msg: "Ressources Works" });
});

module.exports = router;
