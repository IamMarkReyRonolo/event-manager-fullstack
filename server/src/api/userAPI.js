const express = require("express");

const router = express.Router();

router.get("/all");
router.get("/:userId");

router.post("/create");

router.patch("/:userId");

router.delete("/:userId");

module.exports = router;
