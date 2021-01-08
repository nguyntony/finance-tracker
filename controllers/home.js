const { layout, partialContent, msgContent, getMessages } = require("../helper");

const home = (req, res) => {
	res.render("home", {
		partials: {
			...partialContent,
			...msgContent
		},
		locals: {
			title: "T|WIN Homepage",
			messages: getMessages(req)
		},
	});
};

module.exports = {
	home,
};
