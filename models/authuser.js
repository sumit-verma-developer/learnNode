const mongoose = require("mongoose");

const authuserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default:'NORMAL'
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Authuser = mongoose.model("Authuser", authuserSchema);

module.exports = Authuser;
