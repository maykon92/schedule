const mongoose = require("mongoose");
const { Schema } = mongoose;

const archiveSchema = new Schema(
  {
    image: String,
    title: String,
    type: String,
    userId: mongoose.ObjectId,
    userName: String,
  },
  {
    timestamps: true,
  }
);

Archive = mongoose.model("Archive", archiveSchema);

module.exports = Archive;
