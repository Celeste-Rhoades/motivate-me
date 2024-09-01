const mongoose = require("mongoose");

const ComplimentsSchema = new mongoose.Schema({
  complimentsText: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
  },
  author: {
    type: String,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: Date.now,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model(
  "Compliments",
  ComplimentsSchema,
  "compliments"
);
