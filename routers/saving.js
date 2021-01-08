const express = require("express")
const router = express.Router()

const { memberController } = require("../controllers")

router
    .get("/list", memberController.savingController.list)

module.exports = router