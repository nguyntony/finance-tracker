const { layout } = require("../../helper");
const { Transaction, User } = require("../../models");
const numeral = require("numeral");

// fn to display the transaction form
const showTransactionForm = (req, res) => {
	res.render("member/transactionForm", {
		...layout,
		locals: {
			title: "Transaction Form",
			transaction: null,
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
			transaction: null,
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

const list = async (req, res) => {
	const { id } = req.session.user;
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

	// console.log(allTransactions);

	res.render("transaction/list", {
		...layout,
		locals: {
			title: "Transactions",
			editedTransactions,
		},
	});
};

const showEditTransactionForm = async (req, res) => {
	const { transactionId } = req.params;
	const { id } = req.session.user;
	const transaction = await Transaction.findByPk(transactionId);

	if (transaction.uid == id) {
		res.render("member/transactionForm", {
			...layout,
			locals: {
				title: "Edit Transaction",
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
	const { id } = req.session.user;
	console.log(`=========${transaction.uid}:${id}`);

	if (transaction.uid == id) {
		res.render("member/transactionDeleteForm", {
			...layout,
			locals: {
				title: "Delete Confirmation",
				transaction,
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
		// flash message here
		res.redirect(`/member/transaction/delete/${transaction.id}`);
	}
};

module.exports = {
	showTransactionForm,
	processTransactionForm,
	showDepositForm,
	processDepositForm,
	list,
	showEditTransactionForm,
	processEditTransactionForm,
	showDeleteTransactionForm,
	processDeleteTransactionForm,
};
