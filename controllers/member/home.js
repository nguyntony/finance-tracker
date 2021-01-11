const {
	layout,
	partialContent,
	msgContent,
	getMessages,
	dashboardContent,
} = require("../../helper");
const { Transaction, User, Saving } = require("../../models");
const { Op } = require("sequelize");
const numeral = require("numeral");

const home = async (req, res) => {
	const { firstName, lastName, id } = req.session.user;
	const user = await User.findByPk(id);

	const allDeposits = await user.getTransactions({
		where: {
			category: "deposit",
		},
	});
	const totalDeposits = allDeposits
		.map((d) => Number(d.amount))
		.reduce((a, b) => a + b, 0);

	const allNonDeposits = await user.getTransactions({
		where: {
			category: {
				[Op.not]: "deposit",
			},
		},
	});

	const totalNonDeposits = allNonDeposits
		.map((n) => Number(n.amount))
		.reduce((a, b) => a + b, 0);

	const totalFunds = totalDeposits - totalNonDeposits;

	const allSavingDeposits = await user.getTransactions({
		where: {
			category: "savings",
		},
	});
	const totalSavingDeposits = allSavingDeposits
		.map((sd) => Number(sd.amount))
		.reduce((a, b) => a + b, 0);

	const allAllocatedSavings = await user.getSavings();

	const totalAllocatedSavings = allAllocatedSavings
		.map((as) => Number(as.progress))
		.reduce((a, b) => a + b, 0);

	const totalSavings = totalSavingDeposits - totalAllocatedSavings;

	res.render("dashboard/home", {
		partials: {
			...dashboardContent,
			...msgContent,
			cards: "/partials/dashboard/cards",
		},
		locals: {
			title: "Member Dashboard",
			firstName,
			lastName,
			messages: getMessages(req),
			totalFunds: numeral(totalFunds).format("$0,0.00"),
			totalSavings: numeral(totalSavings).format("$0,0.00"),
		},
	});
};

module.exports = {
	home,
};
