const express = require("express");
const router = express.Router();

// Controller
const {
  insertArchive,
  deleteArchive,
  getAllArchives,
  getUserArchives,
  getArchiveById,
  updateArchive,
  commentArchive,
  searchArchives,
} = require("../controllers/ArchiveController");

// Middlewares
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidations");
const {
    archiveInsertValidation,
    archiveUpdateValidation,
    commentValidation,
} = require("../middlewares/archiveValidations");
const { archiveUpload } = require("../middlewares/archiveUpload");

// Routes
router.post(
  "/",
  authGuard,
  archiveUpload.single("image"),
  archiveInsertValidation(),
  validate,
  insertArchive
);
router.delete("/:id", authGuard, deleteArchive);
router.get("/", getAllArchives);
router.get("/user/:id", getUserArchives);
router.get("/search", searchArchives);

router.get("/:id", getArchiveById);
router.put(
  "/:id",
  authGuard,
  archiveUpload.single("image"),
  archiveUpdateValidation(),
  validate,
  updateArchive
);
router.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  commentArchive
);

module.exports = router;
