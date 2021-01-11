const express = require("express");
const router = express.Router();

const { memberController } = require("../controllers");

router.get("/", memberController.statisticsController.statistics);

module.exports = router;
