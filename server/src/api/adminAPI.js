const express = require("express");

const router = express.Router();

router.get("/:adminId");

router.post("/create");

router.patch("/:adminId");

router.delete("/:adminId");

module.exports = router;
