"use strict";

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

const path = require("path");

let state = {};
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
  res.render("creation", {state})
});

// parse request body to suitable object
function parseBody(body) {
  const question = body.question;
  delete body.question;
  const options = Object.values(body).filter(element => {
    return element !== '';
  });
  return { question, options}; 
}

// create new poll
app.post("/vote", (req, res) => {
  const id = Math.random().toString(36).slice(2); // repeat after 70M expected
  const poll = parseBody(req.body);
  state[id] = poll;
  res.redirect("/vote/"+id);
});

app.get("/vote/:paramName", (req, res) => {
  const id = req.params.paramName;
  const poll = state[id];
  res.render("vote", {poll})
});
app.listen(port, function () {
  console.log(`server is running on port ${port}.`);
});
