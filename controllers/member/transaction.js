const { layout } = require("../../helper");
const { Transaction } = require("../../models");

// fn to display the transaction form
const showTransactionForm = (req, res) => {
	res.render("member/transactionForm", {
		...layout,
		locals: {
			title: "Transaction Form",
		},
	});
};

// fn to process the transaction form
const processTransactionForm = async (req, res) => {
	// need uid
	const { id } = req.session.user;
	// need to extract the values from the form
	let { category, amount, description } = req.body;

	// will possibly need to change the amount to a number value and also account for decimal places
	if (!description) {
		description = null;
	}

	const newTransaction = await Transaction.create({
		category,
		amount,
		description,
		uid: id,
	});

	// need to figure out where to redirect the user
	res.redirect("/member/home");
};

// fn to display deposit form
const showDepositForm = (req, res) => {
	res.render("member/depositForm", {
		...layout,
		locals: {
			title: "Deposit Form",
		},
	});
};

// fn to process the deposit form
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

module.exports = {
	showTransactionForm,
	processTransactionForm,
	showDepositForm,
	processDepositForm,
};
