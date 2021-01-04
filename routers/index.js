const express = require("express");
const router = express.Router();

router
    .use("/", require("./home"))
    .use("/user", require("./user"))
    .use("/member", require("./member"))

module.exports = router;
