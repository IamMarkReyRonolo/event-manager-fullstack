const express = require("express");

const router = express.Router();

router.get("/all");
router.get("/:eventId");

router.post("/create");

router.patch("/:eventId");

router.delete("/:eventId");

module.exports = router;
