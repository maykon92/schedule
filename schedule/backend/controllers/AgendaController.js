const Agenda = require("../models/Agenda");

const mongoose = require("mongoose");

// Insert an agenda, with an user related to it
const insertAgenda = async (req, res) => {
  const { date, description } = req.body;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Create agenda
  const newAgenda = await Agenda.create({
    date,
    description,
    userId: user._id,
    userName: user.name,
  });

  // If user was agenda sucessfully, return data
  if (!newAgenda) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json(newAgenda);
};

// Remove an Agenda from the DB
const deleteAgenda = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  try {
    const agenda = await Agenda.findById(new mongoose.Types.ObjectId(id));

    // Check if Agenda exists
    if (!agenda) {
      res.status(404).json({ errors: ["Agenda não encontrada!"] });
      return;
    }

    // Check if Agenda belongs to user
    if (!agenda.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }

    await Agenda.findByIdAndDelete(agenda._id);

    res
      .status(200)
      .json({ id: agenda._id, message: "Agenda excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Agenda não encontrada!"] });
    return;
  }

};

// Get all Agendas
const getAllAgendas = async (req, res) => {
  const agendas = await Agenda.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(agendas);
};

// Get user Agendas
const getUserAgendas = async (req, res) => {
  const { id } = req.params;

  const agendas = await Agenda.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(agendas);
};

// Get Agenda by id
const getAgendaById = async (req, res) => {
  const { id } = req.params;

  const agenda = await Agenda.findById(new mongoose.Types.ObjectId(id));

  // Check if Agenda exists
  if (!agenda) {
    res.status(404).json({ errors: ["Agenda não encontrado!"] });
    return;
  }

  res.status(200).json(agenda);
};

// Update an Agenda
const updateAgenda = async (req, res) => {
  const { id } = req.params;
  const { date, description } = req.body;

  const reqUser = req.user;

  const agenda = await Agenda.findById(id);

  // Check if Agenda exists
  if (!agenda) {
    res.status(404).json({ errors: ["Agenda não encontrada!"] });
    return;
  }

  // Check if Agenda belongs to user
  if (!agenda.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde!"] });
    return;
  }

  if (date) {
    agenda.date = date;
  }

  if (description) {
    agenda.description = description;
  }

  await agenda.save();

  res.status(200).json({ agenda, message: "Agenda atualizada com sucesso!" });
};

// Comment functionality
const commentAgenda = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const agenda = await Agenda.findById(id);

  // Check if Agenda exists
  if (!agenda) {
    res.status(404).json({ errors: ["Agenda não encontrada!"] });
    return;
  }

  // Put comment in the array of comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  agenda.comments.push(userComment);

  await agenda.save();

  res.status(200).json({
    comment: userComment,
    message: "Programação adicionado com sucesso!",
  });
};

// Search an Agenda by userId
const searchAgendas = async (req, res) => {
  const { q } = req.query;
  
  const agendas = await Agenda.find({ userId: new RegExp(q, "i") }).exec();

  res.status(200).json(agendas);
};

module.exports = {
  insertAgenda,
  deleteAgenda,
  getAllAgendas,
  getUserAgendas,
  getAgendaById,
  updateAgenda,
  commentAgenda,
  searchAgendas,
};