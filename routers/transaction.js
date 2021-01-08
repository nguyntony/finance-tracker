const express = require("express");
const router = express.Router();

// import controller
const { memberController } = require("../controllers");

router
	.use("/list", memberController.transactionController.list)
	.use(
		"/edit/:transactionId",
		memberController.transactionController.showEditTransactionForm
	)
	.post(
		"/edit/:transactionId",
		memberController.transactionController.processEditTransactionForm
	);

module.exports = router;
