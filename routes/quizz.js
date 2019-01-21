const express = require("express");
const router = express.Router();

// @route GET quizz/
// @access Private
router.get("/", (req, res) => {
  res.json({ msg: "Quizz Works" });
});

module.exports = router;
