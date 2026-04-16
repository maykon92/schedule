require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();

// Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// db connection
const conn = require("./config/db.js");

// test route
app.get("/", (req, res) => {
  res.send("API Working!");
});

// routes
const router = require("./routes/Router.js");
app.use(router);

const start = async () => {
  try {
    await conn();
    app.listen(port, () => {
      console.log(`App rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error.message);
  }
};

start();