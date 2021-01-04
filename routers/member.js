const express = require("express")
const router = express.Router()

const { userController } = require("../controllers")
const { memberController } = require("../controllers")

router
    .use("/", userController.requireLogin)
    .get("/home", memberController.memberHomeController.home)
    .get("/transaction/create", memberController.transactionController.showTransactionForm)
    .post("/transaction/create", memberController.transactionController.processTransactionForm)
    .get("/saving/create", memberController.savingController.showSavingForm)
    .post("/saving/create", memberController.savingController.processSavingForm)
    .get("/deposit/create", memberController.transactionController.showDepositForm)
    .post("/deposit/create", memberController.transactionController.processDepositForm)


module.exports = router