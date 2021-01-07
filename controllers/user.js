const bcrypt = require("bcryptjs");
const { layout, partialContent, msgContent, getMessages } = require("../layout");
const { User } = require("../models");

const signUp = (req, res) => {
	res.render("user/signup", {
		// ...layout,
		// locals: {
		// 	title: "Sign Up!",
		// 	errormsg: "",
		// },
		partials: {
			...partialContent,
			...msgContent
		},
		locals: {
			title: "Sign Up",
			messages: getMessages(req)
		}
	});
};

const processSignUp = async (req, res) => {
	const { username, password, firstName, lastName, email } = req.body;

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	try {
		const newUser = await User.create({
			username,
			hash,
			firstName,
			lastName,
			email,
		});
		res.redirect(`${req.baseUrl}/login`);
	} catch (e) {
		if (e.name === "SequelizeUniqueConstraintError") {
			// res.render("user/signup", {
			// 	...layout,
			// 	locals: {
			// 		title: "Sign Up!",
			// 		errormsg: "This username is already taken.",
			// 	},
			// });
			req.session.flash = { error: "This username has already been taken." }
			req.session.save(() => {
				res.redirect("/user/signup")
			})

		}
	}
};

const login = (req, res) => {
	res.render("user/login", {
		// ...layout,
		// locals: {
		// 	title: "Login!",
		// 	errormsg: "",
		// },
		partials: {
			...partialContent,
			...msgContent
		},
		locals: {
			title: "Login",
			messages: getMessages(req)
		}
	});
};

const processLogin = async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({
		where: {
			username,
		},
	});
	if (user && bcrypt.compareSync(password, user.hash)) {
		console.log("=====LOGIN SUCCESS=====");
		req.session.user = {
			firstName: user.firstName,
			id: user.id,
		};
		req.session.save(() => {
			res.redirect("/member/home");
		});
	} else {
		// res.render("user/login", {
		// 	...layout,
		// 	locals: {
		// 		title: "Log In!",
		// 		errormsg: "The username or password is incorrect.",
		// 	},
		// });
		req.session.flash = { error: "The username or password is incorrect." }
		req.session.save(() => {
			res.redirect("/user/login")
		})
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
		res.redirect("/user/login");
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
