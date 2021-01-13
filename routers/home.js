const express = require("express")
const router = express.Router()

const { homeController } = require("../controllers")

router
    .get("/", homeController.home)
    .get("*", homeController.errorPage)

module.exports = router