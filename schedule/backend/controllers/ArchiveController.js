const Archive = require("../models/Archive");

const mongoose = require("mongoose");

// Insert an archive, with an user related to it
const insertArchive = async (req, res) => {
  const { title, type } = req.body;
  const image = req.file.filename;
  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Create archive
  const newArchive = await Archive.create({
    image,
    title,
    type,
    userId: user._id,
    userName: user.name,
  });

  // If user was archive sucessfully, return data
  if (!newArchive) {
    res.status(422).json({
      errors: ["Houve um erro, por favor tente novamente mais tarde."],
    });
    return;
  }

  res.status(201).json(newArchive);
};

// Remove an archive from the DB
const deleteArchive = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  try {
    const archive = await Archive.findById(new mongoose.Types.ObjectId(id));
    
    // Check if archive exists
    if (!archive) {
      res.status(404).json({ errors: ["Arquivo não encontrada!"] });
      return;
    }

    // Check if archive belongs to user
    if (!archive.userId.equals(reqUser._id)) {
      res
        .status(422)
        .json({ errors: ["Ocorreu um erro, tente novamente mais tarde"] });
      return;
    }

    await Archive.findByIdAndDelete(archive._id);

    res
      .status(200)
      .json({ id: archive._id, message: "Arquivo excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Arquivo não encontrada!"] });
      return;
  }
  
};

// Get all archives
const getAllArchives = async (req, res) => {
  const archives = await Archive.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(archives);
};

// Get user archives
const getUserArchives = async (req, res) => {
  const { id } = req.params;

  const archives = await Archive.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(archives);
};

// Get archive by id
const getArchiveById = async (req, res) => {
  const { id } = req.params;

  const archive = await Archive.findById(new mongoose.Types.ObjectId(id));

  // Check if archive exists
  if (!archive) {
    res.status(404).json({ errors: ["Arquivo não encontrado!"] });
    return;
  }

  res.status(200).json(archive);
};

// Update an archive
const updateArchive = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let image;

  if (req.file) {
    image = req.file.filename;
  }

  const reqUser = req.user;

  const archive = await Archive.findById(id);

  // Check if archive exists
  if (!archive) {
    res.status(404).json({ errors: ["Arquivo não encontrada!"] });
    return;
  }

  // Check if archive belongs to user
  if (!archive.userId.equals(reqUser._id)) {
    res
      .status(422)
      .json({ errors: ["Ocorreu um erro, tente novamente mais tarde!"] });
    return;
  }

  if (title) {
    archive.title = title;
  }

  if (image) {
    archive.image = image;
  }

  await archive.save();

  res.status(200).json({ archive, message: "Arquivo atualizada com sucesso!" });
};

// Comment functionality
const commentArchive = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  const archive = await Archive.findById(id);

  // Check if archive exists
  if (!archive) {
    res.status(404).json({ errors: ["Arquivo não encontrada!"] });
    return;
  }

  // Put comment in the array of comments
  const userComment = {
    comment,
    userName: user.name,
    userImage: user.profileImage,
    userId: user._id,
  };

  archive.comments.push(userComment);

  await archive.save();

  res.status(200).json({
    comment: userComment,
    message: "Comentário adicionado com sucesso!",
  });
};

// Search an archive by title
const searchArchives = async (req, res) => {
  const { q } = req.query;
  const archives = await Archive.find({ type: new RegExp(q, "i") }).exec();

  res.status(200).json(archives);
};

module.exports = {
  insertArchive,
  deleteArchive,
  getAllArchives,
  getUserArchives,
  getArchiveById,
  updateArchive,
  commentArchive,
  searchArchives,
};
