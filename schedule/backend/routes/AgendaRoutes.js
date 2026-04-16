const express = require("express");
const router = express.Router();

// Controller
const {
  insertAgenda,
  deleteAgenda,
  getAllAgendas,
  getUserAgendas,
  getAgendaById,
  updateAgenda,
  commentAgenda,
  searchAgendas,
} = require("../controllers/AgendaController");

// Middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidations");
const {
    agendaInsertValidation,
    agendaUpdateValidation,
    commentValidation,
} = require("../middlewares/agendaValidations");

// Routes
router.post(
  "/",
  authGuard,
  agendaInsertValidation(),
  validate,
  insertAgenda
);
router.delete("/:id", authGuard, deleteAgenda);
router.get("/", getAllAgendas);
router.get("/user/:id", getUserAgendas);
router.get("/search", searchAgendas);

router.get("/:id", getAgendaById);
router.put(
  "/:id",
  authGuard,
  agendaUpdateValidation(),
  validate,
  updateAgenda
);
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentAgenda
);

module.exports = router;
