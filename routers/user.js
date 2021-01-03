const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router
	.get("/signup", userController.signUp)
	.post("/signup", userController.processSignUp)
	.get("/login", userController.login)
	.post("/login", userController.processLogin);

module.exports = router;
