const mongoose = require("mongoose");
const { Schema } = mongoose;

const itinerarySchema = new Schema(
  {
    title: String,
    description,
    userId: mongoose.ObjectId,
    userName: String,
  },
  {
    timestamps: true,
  }
);

Itinerary = mongoose.model("Itinerary", itinerarySchema);

module.exports = Itinerary;
