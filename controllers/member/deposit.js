const { dashboardContent, msgContent, getMessages } = require("../../helper");
const { Transaction, User, Saving } = require("../../models");
const { Op } = require("sequelize");
const numeral = require("numeral");

const list = async (req, res) => {
	const { id, firstName, lastName } = req.session.user;
	const user = await User.findByPk(id);
	const allDeposits = await user.getTransactions({
		where: {
			category: "deposit",
		},
		order: [["createdAt", "desc"]],
	});

	const editedDeposits = allDeposits.map((t) => {
		return {
			id: t.id,
			category: t.category,
			description: t.description,
			amount: numeral(t.amount).format("$0,0.00"),
		};
	});

	res.render("dashboard/deposit/depositList", {
		partials: {
			...dashboardContent,
			depositList: "/partials/dashboard/depositView/list",
		},
		locals: {
			title: "Transactions",
			firstName,
			lastName,
			editedDeposits,
		},
	});
};

module.exports = {
	list,
};
