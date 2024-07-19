const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject.controller");

// router.post("/create", subjectController.create);
router.get("/", subjectController.getAll);

module.exports = router;
