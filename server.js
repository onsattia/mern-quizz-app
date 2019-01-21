const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/students");
// set up express app
const app = express();

// body-parser middleware
app.use(bodyParser.json());

// init routes
app.use(routes);

//port number
const port = process.env.PORT || 3000;
// listen for requests
app.listen(port, () => {
  console.log(`Listenning on port ${port} ...`);
});
