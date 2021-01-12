const express = require("express");
const router = express.Router();

const { memberController } = require("../controllers");

router
	.get("/", memberController.statisticsController.statistics)
	.post("/", memberController.statisticsController.processMonthSelection)
	.get(
		"/:year/:month",
		memberController.statisticsController.monthlyStatistics
	)
	.post(
		"/:year/:month",
		memberController.statisticsController.monthlyStatistics
	);

module.exports = router;
