const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "guest" + new Date().getTime(),
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
