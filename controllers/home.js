const { msgContent, getMessages, homepageContent } = require("../helper");

const home = (req, res) => {
	res.render("home", {
		partials: {
			...msgContent,
			...homepageContent,
			defaultContent: "/partials/homepage/defaultContent"
		},
		locals: {
			title: "T|WIN Homepage",
			messages: getMessages(req),
			heroImage: "home"
		},
	});
};

const errorPage = (req, res) => {
	res.render("error404",)
}

module.exports = {
	home,
	errorPage
};
