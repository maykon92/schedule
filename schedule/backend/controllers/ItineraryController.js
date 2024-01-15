const Itinerary = require("../models/Itinerary");

const mongoose = require("mongoose");

// Insert an itinerary, with an user related to it
const insertItinerary = async (req, res) => {
  const { title, description } = req.body;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Create itinerary
  const newItinerary = await Itinerary.create({
    title,
    description,
    userId: user._id,
    userName: user.name,
  });

  // If user was itinerary sucessfully, return data
  if (!newItinerary) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json(newItinerary);
};

// Remove an Itinerary from the DB
const deleteItinerary = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  try {
    const itinerary = await Itinerary.findById(new mongoose.Types.ObjectId(id));

    // Check if Itinerary exists
    if (!itinerary) {
      res.status(404).json({ errors: ["Itinerário não encontrada!"] });
      return;
    }

    // Check if Itinerary belongs to user
    if (!itinerary.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }

    await Itinerary.findByIdAndDelete(itinerary._id);

    res
      .status(200)
      .json({ id: itinerary._id, message: "Itinerário excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Itinerário não encontrada!"] });
    return;
  }

};

// Get all Itinerarys
const getAllItinerarys = async (req, res) => {
  const itinerarys = await Itinerary.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(itinerarys);
};

// Get user Itinerarys
const getUserItinerarys = async (req, res) => {
  const { id } = req.params;

  const itinerarys = await Itinerary.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(itinerarys);
};

// Get Itinerary by id
const getItineraryById = async (req, res) => {
  const { id } = req.params;

  const itinerary = await Itinerary.findById(new mongoose.Types.ObjectId(id));

  // Check if Itinerary exists
  if (!itinerary) {
    res.status(404).json({ errors: ["Itinerário não encontrado!"] });
    return;
  }

  res.status(200).json(itinerary);
};

// Update an Itinerary
const updateItinerary = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const reqUser = req.user;

  const itinerary = await Itinerary.findById(id);

  // Check if Itinerary exists
  if (!itinerary) {
    res.status(404).json({ errors: ["Itinerário não encontrada!"] });
    return;
  }

  // Check if Itinerary belongs to user
  if (!itinerary.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde!"] });
    return;
  }

  if (title) {
    itinerary.title = title;
  }

  if (description) {
    itinerary.description = description;
  }

  await itinerary.save();

  res.status(200).json({ itinerary, message: "Itinerário atualizada com sucesso!" });
};

// Comment functionality
const commentItinerary = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const itinerary = await Itinerary.findById(id);

  // Check if Itinerary exists
  if (!itinerary) {
    res.status(404).json({ errors: ["Itinerário não encontrada!"] });
    return;
  }

  // Put comment in the array of comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  itinerary.comments.push(userComment);

  await itinerary.save();

  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso!",
  });
};

// Search an Itinerary by userId
const searchItinerarys = async (req, res) => {
  const { q } = req.query;
  
  const itinerarys = await Itinerary.find({ userId: new RegExp(q, "i") }).exec();

  res.status(200).json(itinerarys);
};

module.exports = {
  insertItinerary,
  deleteItinerary,
  getAllItinerarys,
  getUserItinerarys,
  getItineraryById,
  updateItinerary,
  commentItinerary,
  searchItinerarys,
};