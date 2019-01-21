const express = require("express");
const router = express.Router();

// @route GET students/
// @access Public
router.get("/", (req, res) => {
  res.json({ msg: "Students Works" });
});

router.post("/", (req, res) => {
  res.send({ type: "POST" });
});

router.put("/:id", (req, res) => {
  res.send({ type: "PUT" });
});

router.delete("/:id", (req, res) => {
  res.send({ type: "DELETE" });
});

module.exports = router;
