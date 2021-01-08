const {
	layout,
	partialContent,
	msgContent,
	getMessages,
	dashboardContent
} = require("../../helper");
const { Transaction, User } = require("../../models");
const { Op } = require("sequelize");
const numeral = require("numeral");

const home = async (req, res) => {
	const { firstName, id } = req.session.user;
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

	res.render("dashboard/home", {
		// partials: {
		// 	...partialContent,
		// 	...msgContent,
		// },
		// locals: {
		// 	title: "Member Homepage",
		// 	firstName,
		// 	messages: getMessages(req),
		// 	totalFunds: numeral(totalFunds).format("$0,0.00"),
		// },
		partials: {
			...dashboardContent,
			...msgContent,
			cards: '/partials/dashboard/cards'
		},
		locals: {
			title: "Member Dashboard",
			firstName,
			messages: getMessages(req),
			totalFunds: numeral(totalFunds).format("$0,0.00")
		}
	});
};

module.exports = {
	home,
};
