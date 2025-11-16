const mongoose = require("mongoose");

const balcklisttokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600, // 1h in seconds
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("blacklisttoken", balcklisttokenSchema);
