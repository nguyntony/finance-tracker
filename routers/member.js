const express = require("express")
const router = express.Router()

const { memberController } = require("../controllers")
const { userController } = require("../controllers")

router
    .use("/", userController.requireLogin)
    .get("/home", memberController.memberHomeController.home)
    .get("/create", memberController.transactionController.showTransactionForm)
    .post("/create", memberController.transactionController.processTransactionForm)


module.exports = router