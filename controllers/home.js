const { layout } = require("../helper");

const home = (req, res) => {
	res.render("home", {
		...layout,
		locals: {
			title: "T|WIN Homepage",
			errormsg: "",
		},
	});
};

module.exports = {
	home,
};
