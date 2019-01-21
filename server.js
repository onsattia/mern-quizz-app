const express = require("express");
const routes = require("./routes/api");

// set up express app
const app = express();

// init routes
app.use(routes);

//port number
const port = process.env.PORT || 3000;
// listen for requests
app.listen(port, () => {
  console.log(`Listenning on port ${port} ...`);
});
