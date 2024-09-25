var express = require("express");
var app = express();
let bodyParser = require("body-parser");

let path = __dirname + "/views/index.html";
let publicPath = __dirname + "/public";

//Challenge 11 - Use body-parser to Parse POST Requests
app.use(bodyParser.urlencoded({ extended: false }));

//Challenge 7 - root-level request logger middleware

app.use(express.static(publicPath));

//Challenge 4 - Serve static Assets
app.use("/public", express.static(publicPath));

//Challenge 3 - Serve an HTML File
app.get("/", (req, res) => {
  res.sendFile(path);
});
//Challenge 12 - Get Data from POST Requests
app.post("/name", (req, res) => {
  res.json({ name: req.body.first + " " + req.body.last });
});

//Challenge 10 - Get Query Parameter Input from the Client
app.get("/name", (req, res) => {
  res.send({ name: req.query.first + " " + req.query.last });
});

//Challenge 9 - Get Route Parameter Input from the Client
app.get("/:word/echo", (req, res) => {
  res.send({ echo: req.params.word });
});

//Challenge 8 - Chain Middleware to Create a Time Server
app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    setTimeout(() => {
      res.send({ time: req.time });
    }, 2000);
  }
);

//Challenge 5 & 6 - Serve JSON on a Specific Route
app.get("/json", (req, res) => {
  const mySecret = process.env["MESSAGE_STYLE"];

  if (mySecret === "uppercase") {
    res.json({ message: "Hello json".toUpperCase() });
  } else {
    res.json({ message: "Hello json" });
  }
});

module.exports = app;
