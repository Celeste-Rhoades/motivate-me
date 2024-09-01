const mongoose = require("mongoose");

const MotivationSchema = new mongoose.Schema({
  motivationText: {
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

module.exports = mongoose.model("Motivation", MotivationSchema, "motivation");
