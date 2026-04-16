const mongoose = require("mongoose");
const { Schema } = mongoose;

const agendaSchema = new Schema(
  {
    date: String,
    description: String,
    userId: mongoose.ObjectId,
    userName: String,
  },
  {
    timestamps: true,
  }
);

Agenda = mongoose.model("Agenda", agendaSchema);

module.exports = Agenda;
