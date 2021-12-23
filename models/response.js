const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let response = new Schema({
  quality: String,
  consistency: String,
  taste: String,
  service: String,
  orderAgain: String,
  name: String,
  phone: String,
  feedback: String
  
});

const model = mongoose.model("response", response);

module.exports = model;