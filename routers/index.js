const express = require("express");
const router = express.Router();

router
    .use("/", require("./home"))
    .use("/user", require("./user"))
    .use("/member", require("./member"))
    .use("/member/transaction", require("./transaction"))
    .use("/member/saving", require("./saving"))

module.exports = router;
