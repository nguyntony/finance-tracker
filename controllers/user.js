const bcrypt = require("bcryptjs");
const {
	layout,
	partialContent,
	msgContent,
	getMessages,
	homepageContent,
} = require("../helper");
const { User } = require("../models");

const signUp = (req, res) => {
	res.render("signup", {
		partials: {
			...homepageContent,
			...msgContent,
			signupForm: "/partials/homepage/signupForm",
		},
		locals: {
			title: "Sign Up",
			messages: getMessages(req),
			heroImage: "signup",
		},
	});
};

const processSignUp = async (req, res) => {
	let { username, password, firstName, lastName, email } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
	lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

	try {
		const newUser = await User.create({
			username,
			hash,
			firstName,
			lastName,
			email,
		});
		res.redirect("/user/login");
	} catch (e) {
		if (e.name === "SequelizeUniqueConstraintError") {
			req.session.flash = {
				error: "This username has already been taken.",
			};
			req.session.save(() => {
				res.redirect("/user/signup");
			});
		}
	}
};

const login = (req, res) => {
	res.render("login", {
		partials: {
			...homepageContent,
			...msgContent,
			loginForm: "/partials/homepage/loginForm",
		},
		locals: {
			title: "Login",
			messages: getMessages(req),
			heroImage: "login",
		},
	});
};

const processLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({
		where: {
			username,
		},
	});
	const passwordCheck = bcrypt.compareSync(password, user.hash);

	if (user && passwordCheck) {
		req.session.user = {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
		};
		req.session.save(() => {
			res.redirect("/member/home");
		});
	} else {
		req.session.flash = { error: "The username or password is incorrect." };
		req.session.save(() => {
			res.redirect("/");
		});
	}
};

const requireLogin = (req, res, next) => {
	if (req.session.user) {
		next();
	} else {
		res.redirect("/user/login");
	}
};

const logout = (req, res) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
};

module.exports = {
	signUp,
	processSignUp,
	login,
	processLogin,
	logout,
	requireLogin,
};
