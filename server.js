const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/students");
// set up express app
const app = express();

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// init routes
app.use(routes);

//port number
const port = process.env.PORT || 3000;
// listen for requests
app.listen(port, () => {
  console.log(`Listenning on port ${port} ...`);
});
