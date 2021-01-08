const express = require("express");
const router = express.Router();

const { memberController } = require("../controllers");

router
	.get("/list", memberController.transactionController.list)
	.get("/list/data", memberController.transactionController.dataList)
	.get(
		"/edit/:transactionId",
		memberController.transactionController.showEditTransactionForm
	)
	.post(
		"/edit/:transactionId",
		memberController.transactionController.processEditTransactionForm
	)
	.get(
		"/delete/:transactionId",
		memberController.transactionController.showDeleteTransactionForm
	)
	.post(
		"/delete/:transactionId",
		memberController.transactionController.processDeleteTransactionForm
	);

module.exports = router;
