const express = require("express");
const router = express.Router();

const { memberController } = require("../controllers");

router
	.get("/", memberController.statisticsController.statistics)
	.post("/", memberController.statisticsController.processMonthSelection)
	.get(
		"/:month/:year",
		memberController.statisticsController.monthlyStatistics
	)
	.post(
		"/:month/:year",
		memberController.statisticsController.processMonthSelection
	)
	.get(
		"/data/:month/:year",
		memberController.statisticsController.monthlyData
	);

module.exports = router;
