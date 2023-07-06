const mongoose = require("mongoose");
const {
  DEFAULT_VALIDATION,
  URL,
} = require("../../../cards/helpers/mongooseValidators");

const Image = new mongoose.Schema({
  url: { ...URL, required: true },
  alt: DEFAULT_VALIDATION,
});

module.exports = Image;
