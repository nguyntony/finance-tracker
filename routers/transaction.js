const express = require("express");
const router = express.Router();

const { memberController } = require("../controllers");

router
	.get("/list", memberController.transactionController.list)
	.get(
		"/edit/:transactionId",
		memberController.transactionController.showEditTransactionForm
	)
	.post("/edit/:transactionId", memberController.transactionController.processEditTransactionForm)


module.exports = router;
