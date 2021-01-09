const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

router
	.get("/signup", userController.signUp) // dont need?
	.post("/signup", userController.processSignUp)
	.get("/login", userController.login) // dont need?
	.post("/login", userController.processLogin)
	.get("/logout", userController.logout);

module.exports = router;
