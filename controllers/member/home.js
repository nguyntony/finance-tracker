const { msgContent, getMessages, dashboardContent } = require("../../helper");
const { User } = require("../../models");
const { Op } = require("sequelize");
const numeral = require("numeral");

const home = async (req, res) => {
	const { firstName, lastName, id } = req.session.user;
	const user = await User.findByPk(id);

	// Function to get total funds
	const allDeposits = await user.getTransactions({
		where: {
			category: "Deposit",
		},
	});
	const totalDeposits = allDeposits
		.map((d) => Number(d.amount))
		.reduce((a, b) => a + b, 0);

	const allNonDeposits = await user.getTransactions({
		where: {
			category: {
				[Op.not]: "Deposit",
			},
		},
		order: [["createdAt", "desc"]],
	});

	const totalNonDeposits = allNonDeposits
		.map((n) => Number(n.amount))
		.reduce((a, b) => a + b, 0);

	const totalFunds = totalDeposits - totalNonDeposits;

	// Function to get total savings
	const allSavingDeposits = await user.getTransactions({
		where: {
			category: "Savings",
		},
	});
	const totalSavingDeposits = allSavingDeposits
		.map((sd) => Number(sd.amount))
		.reduce((a, b) => a + b, 0);

	const allAllocatedSavings = await user.getSavings({
		order: [["createdAt", "desc"]],
	});

	const totalAllocatedSavings = allAllocatedSavings
		.map((as) => Number(as.progress))
		.reduce((a, b) => a + b, 0);

	const totalSavings = totalSavingDeposits - totalAllocatedSavings;

	// Function to get most recent savings goal
	const mostRecentSavingGoal = allAllocatedSavings[0];
	// Function to get most recent Transaction
	const mostRecentTransaction = allNonDeposits[0];

	let pinnedGoal = await user.getSavings({
		where: {
			pinned: true,
		},
	});

	// pinnedGoal = pinnedGoal[0];

	if (pinnedGoal.length == 0) {
		pinnedGoal = false;
	}

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
			MRT: mostRecentTransaction,
			MRTAmt: mostRecentTransaction
				? numeral(mostRecentTransaction.amount).format("$0,0.00")
				: "",
			NoMRT: "You have no recent transactions!",
			PGoal: pinnedGoal[0], // If there's a pinned goal, set it to PGoal
			PGoalProg: pinnedGoal
				? numeral(pinnedGoal[0].progress).format("$0,0.00")
				: "",
			PGoalTotal: pinnedGoal
				? numeral(pinnedGoal[0].total).format("$0,0.00")
				: "",
			MRSG: pinnedGoal ? "" : mostRecentSavingGoal, // If PGoal doesn't exist, set it to false and let MRSG be mostRecentSavingGoal
			MRSGProg: mostRecentSavingGoal
				? numeral(mostRecentSavingGoal.progress).format("$0,0.00")
				: "",
			MRSGTotal: mostRecentSavingGoal
				? numeral(mostRecentSavingGoal.total).format("$0,0.00")
				: "",
			NoMRSG: "You have no saving goal! Create one now!",
		},
	});
};

module.exports = {
	home,
};
