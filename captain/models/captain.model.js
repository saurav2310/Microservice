const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    select:false
  },
  isAvailable:{
    type:Boolean,
    default:false
  }
});

module.exports = mongoose.model("captain", captainSchema);
