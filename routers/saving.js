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
	.get("/allocation", memberController.savingController.showAllocationForm)
	.post(
		"/allocation",
		memberController.savingController.processAllocationForm
	);

module.exports = router;
