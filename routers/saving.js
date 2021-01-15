const express = require("express");
const router = express.Router();

const { memberController } = require("../controllers");

router
	.get("/list", memberController.savingController.list)
	.get(
		"/edit/:savingId",
		memberController.savingController.showEditSavingForm
	)
	.post(
		"/edit/:savingId",
		memberController.savingController.processEditSavingForm
	)
	.get(
		"/delete/:savingId",
		memberController.savingController.showDeleteSavingForm
	)
	.post("/delete/:savingId", memberController.savingController.processDeleteSavingForm)
	.get("/allocation", memberController.savingController.showAllocationForm)
	.post(
		"/allocation",
		memberController.savingController.processAllocationForm
	)
	.get(
		"/reallocation/:savingId",
		memberController.savingController.showReallocationForm
	)
	.post(
		"/reallocation/:savingId",
		memberController.savingController.processReallocationForm
	)
	.post("/pinned/:goalId", memberController.savingController.pinnedGoal)

module.exports = router;
