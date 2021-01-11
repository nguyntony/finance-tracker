const { dashboardContent, msgContent, getMessages } = require("../../helper");
const { Saving, User, Transaction } = require("../../models");
const numeral = require("numeral");

const statistics = async (req, res) => {
	const { firstName, lastName } = req.session.user;
	res.render("dashboard/statistics/statistics", {
		partials: {
			...dashboardContent,
			statistics: "/partials/dashboard/statisticsView/statistics",
		},
		locals: {
			title: "Statistics",
			lastName,
			firstName,
		},
	});
};

module.exports = {
	statistics,
};
