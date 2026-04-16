const express = require("express");
const router = express.Router();

router.use("/api/users", require("./UserRoutes"));
router.use("/api/photos", require("./PhotoRoutes"));
router.use("/api/archives", require("./ArchiveRoutes"));
router.use("/api/itinerarys", require("./ItineraryRoutes"));
router.use("/api/agendas", require("./AgendaRoutes"));

module.exports = router;