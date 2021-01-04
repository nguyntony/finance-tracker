const express = require("express")
const router = express.Router()

const { memberController } = require("../controllers")

router
    .get("/home", memberController.memberHomeController.home)


module.exports = router