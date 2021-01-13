const { dashboardContent, msgContent, getMessages } = require("../../helper");
const { Saving, User, Transaction } = require("../../models");
const numeral = require("numeral");
const { Op } = require("sequelize");
const moment = require("moment");

const monthlyCache = async (req, res) => {
	const { id } = req.session.user;
	const user = await User.findByPk(id);
	const transaction = await user.getTransactions();

	cache = {};
	const dateOnly = transaction.map((t) => {
		const editedDate = moment(t.createdAt).format("MMMM YYYY");
		if (!cache[editedDate]) {
			cache[editedDate] = true;
		}
	});

	return cache;
};

const monthlyData = async (req, res) => {
	const { id } = req.session.user;
	const { year, month } = req.params;
	const user = await User.findByPk(id);
	const allTransactions = await user.getTransactions({
		where: {
			createdYear: year,
			createdMonth: month,
		},
	});
	res.json(allTransactions);
};

const statistics = async (req, res) => {
	const { firstName, lastName } = req.session.user;
	const months = await monthlyCache(req, res);

	res.render("dashboard/statistics/statistics", {
		partials: {
			...dashboardContent,
			statistics: "/partials/dashboard/statisticsView/statistics",
		},
		locals: {
			title: "Statistics",
			lastName,
			firstName,
			transactionDates: Object.keys(months),
			h2: "All Transactions",
		},
	});
};

const processMonthSelection = async (req, res) => {
	const { id } = req.session.user;
	let { date } = req.body;
	const splitDate = date.split(" ");
	console.log(splitDate);

	res.redirect(`/member/statistics/${splitDate[0]}/${splitDate[1]}`);
};

const monthlyStatistics = async (req, res) => {
	const { firstName, lastName, id } = req.session.user;
	const { year, month } = req.params;
	const months = await monthlyCache(req, res);

	const editedMonth = month + " " + year;

	res.render("dashboard/statistics/monthlyStatistics", {
		partials: {
			...dashboardContent,
			monthlyStatistics:
				"/partials/dashboard/statisticsView/monthlyStatistics",
		},
		locals: {
			title: "Statistics",
			lastName,
			firstName,
			transactionDates: Object.keys(months),
			h2: editedMonth,
		},
	});
};

module.exports = {
	statistics,
	processMonthSelection,
	monthlyStatistics,
	monthlyData,
};
