const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  real_name: {
    type: String,
    default: ""
  },
  qr_code: {
    type: data,
    default: ""
  },
});

module.exports = mongoose.model("User", UserSchema);