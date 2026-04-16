const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ucnvgn8.mongodb.net/schedule?retryWrites=true&w=majority`
    );

    console.log("Conectou ao Banco!");
  } catch (error) {
    console.error("Erro ao conectar no MongoDB:", error.message);
    throw error;
  }
};

module.exports = conn;