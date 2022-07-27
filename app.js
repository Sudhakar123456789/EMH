// Run "npm i express body-parser mongoose" on command line
// Then Run "node app.js"
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"));

// Save to DataBase
mongoose.connect("mongodb://localhost:27017/healthDB")
const concernSchema = new mongoose.Schema({
  name: String,
  employeeId: String,
  phoneNumber: Number,
  emailId: String,
  concern: String
})

const Concern = mongoose.model('Concern', concernSchema)

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/health", function(req, res) {
  const concern = new Concern({
    name: req.body.name,
    employeeId: req.body.employeeId,
    phoneNumber: req.body.phoneNumber,
    emailId: req.body.email,
    concern: req.body.concern
  })
  //Save to DataBase
  concern.save()
  res.send("<h3>👍 Concern Successfully Submitted </h3>")
})

app.listen(3000, function() {
  console.log("Running on port 3000")
})
