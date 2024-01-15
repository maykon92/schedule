const express = require("express");
const router = express.Router();

// Controller
const {
  insertItinerary,
  deleteItinerary,
  getAllItinerarys,
  getUserItinerarys,
  getItineraryById,
  updateItinerary,
  commentItinerary,
  searchItinerarys,
} = require("../controllers/ItineraryController");

// Middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidations");
const {
    itineraryInsertValidation,
    itineraryUpdateValidation,
    commentValidation,
} = require("../middlewares/itineraryValidations");

// Routes
router.post(
  "/",
  authGuard,
  itineraryInsertValidation(),
  validate,
  insertItinerary
);
router.delete("/:id", authGuard, deleteItinerary);
router.get("/", getAllItinerarys);
router.get("/user/:id", getUserItinerarys);
router.get("/search", searchItinerarys);

router.get("/:id", getItineraryById);
router.put(
  "/:id",
  authGuard,
  itineraryUpdateValidation(),
  validate,
  updateItinerary
);
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentItinerary
);

module.exports = router;
