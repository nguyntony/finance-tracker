const { dashboardContent, msgContent, getMessages } = require("../../helper");
const { Transaction, User, Saving } = require("../../models");
const { Op } = require("sequelize");
const numeral = require("numeral");

// Function to check total funds.
const checkTotalFunds = async (req, res) => {
	const { id } = req.session.user;
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
		order: [["createdAt", "desc"]],
	});

	const totalNonDeposits = allNonDeposits
		.map((n) => Number(n.amount))
		.reduce((a, b) => a + b, 0);

	const totalFunds = totalDeposits - totalNonDeposits;

	return totalFunds;
};

// fn to display the transaction form
const showTransactionForm = async (req, res) => {
	const { firstName, lastName } = req.session.user;

	const totalFunds = await checkTotalFunds(req, res);
	console.log(totalFunds);

	res.render("dashboard/transaction/addTransaction", {
		partials: {
			...dashboardContent,
			...msgContent,
			addTransaction:
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

	const totalFunds = await checkTotalFunds(req, res);

	if (!description) {
		description = null;
	}

	if (totalFunds - Number(amount) < 0) {
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

	if (!description) {
		description = null;
	}

	const newDeposit = await Transaction.create({
		category: "deposit",
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
				transactionForm:
					"/partials/dashboard/transactionView/transactionForm",
			},
			locals: {
				title: "Transaction",
				firstName,
				lastName,
				transaction,
			},
		});
	} else {
		res.redirect("/member/home");
	}
};

const processEditTransactionForm = async (req, res) => {
	const { transactionId } = req.params;
	const { category, amount, description } = req.body;

	const findTransaction = await Transaction.findByPk(transactionId);
	findTransaction.update({ category, amount, description });

	res.redirect("/member/transaction/list");
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
