const express = require("express")
const router = express.Router()

// import controller
const { memberController } = require("../controllers")

router
    .get("/list", memberController.savingController.list)

module.exports = router