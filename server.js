const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const quizzes = require("./routes/quizzes");
const ressources = require("./routes/ressources");
const profile = require("./routes/profile");
const questions = require("./routes/questions");
const tracks = require("./routes/tracks");

// Set up express app
const app = express();

app.use("/uploads", express.static("uploads"));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDBError", err));

// Passport middleware
app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// Use routes
app.use("/users", users);
app.use("/quizzes", quizzes);
app.use("/ressources", ressources);
app.use("/profile", profile);
app.use("/questions", questions);
app.use("/tracks", tracks);

//port number
const port = process.env.PORT || 5000;
// listen for requests
app.listen(port, () => {
  console.log(`Listenning on port ${port}...`);
});
