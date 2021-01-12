const { dashboardContent, msgContent, getMessages } = require("../../helper");
const { Transaction, User, Saving } = require("../../models");
const { Op } = require("sequelize");
const numeral = require("numeral");

// Function to check total funds or total non-deposits
const checkTotalFundsOrTotalNonDeposits = async (req, res) => {
	const { id } = req.session.user;
	const user = await User.findByPk(id);

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
	});

	const totalNonDeposits = allNonDeposits
		.map((n) => Number(n.amount))
		.reduce((a, b) => a + b, 0);

	const totalFunds = totalDeposits - totalNonDeposits;

	return { totalFunds, totalNonDeposits };
};

// Function to check total deposits without editing one
const checkTotalDeposits = async (req, res, transactionId) => {
	const { id } = req.session.user;
	const user = await User.findByPk(id);

	const allDeposits = await user.getTransactions({
		where: {
			category: "Deposit",
		},
		id: {
			[Op.not]: transactionId,
		},
	});

	const totalDeposits = allDeposits
		.map((n) => Number(n.amount))
		.reduce((a, b) => a + b, 0);

	return totalDeposits;
};

// Function to check total savings progress
const checkTotalProgress = async (req, res, transactionId) => {
	const { id } = req.session.user;
	const user = await User.findByPk(id);

	const allSavings = await user.getSavings();

	const totalSavingsProgress = allSavings
		.map((n) => Number(n.progress))
		.reduce((a, b) => a + b, 0);

	return totalSavingsProgress;
};

// Function to check total savings amount without the edited one.
const checkTotalSavings = async (req, res, transactionId) => {
	const { id } = req.session.user;
	const user = await User.findByPk(id);

	const allSavingDeposits = await user.getTransactions({
		where: {
			category: "Savings",
			id: {
				[Op.not]: transactionId,
			},
		},
	});

	const totalSavings = allSavingDeposits
		.map((n) => Number(n.amount))
		.reduce((a, b) => a + b, 0);

	return totalSavings;
};

// fn to display the transaction form
const showTransactionForm = async (req, res) => {
	const { firstName, lastName } = req.session.user;

	res.render("dashboard/transaction/transactionForm", {
		partials: {
			...dashboardContent,
			...msgContent,
			transactionForm:
				"/partials/dashboard/transactionView/transactionForm",
		},
		locals: {
			title: "Transaction Form",
			firstName,
			lastName,
			transaction: null,
			messages: getMessages(req),
		},
	});
};

const processTransactionForm = async (req, res) => {
	const { id } = req.session.user;
	let { category, amount, description } = req.body;

	description = description.charAt(0).toUpperCase() + description.slice(1);

	const totalFunds = await checkTotalFundsOrTotalNonDeposits(req, res);

	if (totalFunds.totalFunds - Number(amount) < 0) {
		req.session.flash = { error: "Insufficient funds." };
		req.session.save(() => {
			res.redirect("/member/transaction/create");
		});
	} else {
		const newTransaction = await Transaction.create({
			category,
			amount,
			description,
			uid: id,
		});

		res.redirect("/member/home");
	}
};

const showDepositForm = (req, res) => {
	const { firstName, lastName } = req.session.user;

	res.render("dashboard/transaction/addDeposit", {
		partials: {
			...dashboardContent,
			addDeposit: "/partials/dashboard/transactionView/depositForm",
		},
		locals: {
			title: "Deposit",
			firstName,
			lastName,
		},
	});
};

const processDepositForm = async (req, res) => {
	const { id } = req.session.user;
	let { amount, description } = req.body;

	description = description.charAt(0).toUpperCase() + description.slice(1);

	const newDeposit = await Transaction.create({
		category: "Deposit",
		amount,
		description,
		uid: id,
	});

	res.redirect("/member/home");
};

const list = async (req, res) => {
	const { id, firstName, lastName } = req.session.user;
	const user = await User.findByPk(id);
	const allTransactions = await user.getTransactions({
		where: {
			category: {
				[Op.not]: "Deposit",
			},
		},
		order: [["createdAt", "desc"]],
	});

	const editedTransactions = allTransactions.map((t) => {
		return {
			id: t.id,
			category: t.category,
			description: t.description,
			amount: numeral(t.amount).format("$0,0.00"),
		};
	});

	res.render("dashboard/transaction/transactionList", {
		partials: {
			...dashboardContent,
			transactionList: "/partials/dashboard/transactionView/list",
		},
		locals: {
			title: "Transactions",
			firstName,
			lastName,
			editedTransactions,
		},
	});
};

const dataList = async (req, res) => {
	const { id } = req.session.user;
	const user = await User.findByPk(id);
	const allTransactions = await user.getTransactions({
		order: [["createdAt", "desc"]],
	});

	res.json(allTransactions);
};

const showEditTransactionForm = async (req, res) => {
	const { transactionId } = req.params;
	const { id, firstName, lastName } = req.session.user;
	const transaction = await Transaction.findByPk(transactionId);

	if (transaction.uid == id) {
		res.render("dashboard/transaction/transactionForm", {
			partials: {
				...dashboardContent,
				...msgContent,
				transactionForm:
					"/partials/dashboard/transactionView/transactionForm",
			},
			locals: {
				title: "Transaction",
				firstName,
				lastName,
				transaction,
				messages: getMessages(req),
			},
		});
	} else {
		res.redirect("/member/home");
	}
};

const processEditTransactionForm = async (req, res) => {
	const { transactionId } = req.params;
	let { category, amount, description } = req.body;

	description = description.charAt(0).toUpperCase() + description.slice(1);

	const totalFundsOrND = await checkTotalFundsOrTotalNonDeposits(req, res);
	const totalDeposits = await checkTotalDeposits(req, res, transactionId);
	const totalProgress = await checkTotalProgress(req, res);
	const totalSavings = await checkTotalSavings(req, res, transactionId);

	if (
		totalFundsOrND.totalFunds - Number(amount) < 0 &&
		category !== "Deposit"
	) {
		req.session.flash = { error: "Insufficient funds." };
		req.session.save(() => {
			res.redirect(`/member/transaction/edit/${transactionId}`);
		});
	} else if (
		totalDeposits + Number(amount) - totalFundsOrND.totalNonDeposits < 0 &&
		category === "Deposit"
	) {
		req.session.flash = { error: "Insufficient funds." };
		req.session.save(() => {
			res.redirect(`/member/transaction/edit/${transactionId}`);
		});
	} else if (
		totalSavings + Number(amount) - totalProgress < 0 &&
		category === "Savings"
	) {
		req.session.flash = { error: "Insufficient savings." };
		req.session.save(() => {
			res.redirect(`/member/transaction/edit/${transactionId}`);
		});
	} else {
		const findTransaction = await Transaction.findByPk(transactionId);
		findTransaction.update({ category, amount, description });

		res.redirect("/member/home");
	}
};

const showDeleteTransactionForm = async (req, res) => {
	const { transactionId } = req.params;
	const transaction = await Transaction.findByPk(transactionId);
	const { id, firstName, lastName } = req.session.user;

	if (transaction.uid == id) {
		res.render("dashboard/transaction/deleteTransaction", {
			partials: {
				...dashboardContent,
				...msgContent,
				deleteTransaction:
					"/partials/dashboard/transactionView/deleteTransaction",
			},
			locals: {
				title: "Delete Confirmation",
				firstName,
				lastName,
				deleteWhat: transaction.description,
				messages: getMessages(req),
			},
		});
	} else {
		res.redirect("/member/home");
	}
};

const processDeleteTransactionForm = async (req, res) => {
	const { transactionId } = req.params;
	const transaction = await Transaction.findByPk(transactionId);
	const { deletion } = req.body;

	if (deletion == "Delete") {
		transaction.destroy();
		res.redirect("/member/transaction/list");
	} else {
		req.session.flash = {
			error: "Your entry does not match. Please try again.",
		};
		req.session.save(() => {
			res.redirect(`/member/transaction/delete/${transaction.id}`);
		});
	}
};

module.exports = {
	showTransactionForm,
	processTransactionForm,
	showDepositForm,
	processDepositForm,
	list,
	dataList,
	showEditTransactionForm,
	processEditTransactionForm,
	showDeleteTransactionForm,
	processDeleteTransactionForm,
};
