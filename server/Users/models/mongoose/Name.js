const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
} = require("../../../cards/helpers/mongooseValidators");

const Name = new mongoose.Schema({
  first: DEFAULT_VALIDATION,
  middle: {
    type: String,
    maxLength: 256,
  },
  last: DEFAULT_VALIDATION,
});

module.exports = Name;
