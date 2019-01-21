const express = require("express");
const router = express.Router();

router.get("/students", (req, res) => {
  res.send({ type: "GET" });
});

router.post("/students", (req, res) => {
  res.send({ type: "POST" });
});

router.put("/students/:id", (req, res) => {
  res.send({ type: "PUT" });
});

router.delete("/students/:id", (req, res) => {
  res.send({ type: "DELETE" });
});

module.exports = router;
