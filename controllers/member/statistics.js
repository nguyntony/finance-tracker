const { dashboardContent, msgContent, getMessages } = require("../../helper");
const { Saving, User, Transaction } = require("../../models");
const numeral = require("numeral");

const statistics = async (req, res) => {
	res.render("dashboard/statistics", {
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
