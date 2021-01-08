const {
	layout,
	dashboardContent,
	msgContent,
	getMessages,
} = require("../../helper");
const { Transaction, User } = require("../../models");
const numeral = require("numeral");

// fn to display the transaction form
const showTransactionForm = (req, res) => {
	const { firstName } = req.session.user;

	res.render("dashboard/transaction/addTransaction", {
		// ...layout,
		// locals: {
		// 	title: "Transaction Form",
		// 	transaction: null,
		// },
		partials: {
			...dashboardContent,
			addTransaction: "/partials/transactionView/transactionForm",
		},
		locals: {
			title: "Transaction Form",
			firstName,
			transaction: null,
		},
	});
};

const processTransactionForm = async (req, res) => {
	const { id } = req.session.user;
	let { category, amount, description } = req.body;

	if (!description) {
		description = null;
	}

	const newTransaction = await Transaction.create({
		category,
		amount,
		description,
		uid: id,
	});

	res.redirect("/member/home");
};

const showDepositForm = (req, res) => {
	const { firstName } = req.session.user;

	res.render("dashboard/transaction/addDeposit", {
		// ...layout,
		// locals: {
		// 	title: "Deposit Form",
		// 	// transaction: null,
		// },
		partials: {
			...dashboardContent,
			addDeposit: "/partials/transactionView/depositForm",
		},
		locals: {
			title: "Deposit",
			firstName,
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
	const { id, firstName } = req.session.user;
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
		// ...layout,
		// locals: {
		// 	title: "Transactions",
		// 	editedTransactions,
		// },
		partials: {
			...dashboardContent,
			transactionList: "/partials/transactionView/list",
		},
		locals: {
			title: "Transactions",
			firstName,
			editedTransactions,
		},
	});
};

const showEditTransactionForm = async (req, res) => {
	const { transactionId } = req.params;
	const { id, firstName } = req.session.user;
	const transaction = await Transaction.findByPk(transactionId);

	if (transaction.uid == id) {
		res.render("dashboard/transaction/transactionForm", {
			// ...layout,
			// locals: {
			// 	title: "Edit Transaction",
			// 	transaction,
			// },
			partials: {
				...dashboardContent,
				transactionForm: "/partials/transactionView/transactionForm",
			},
			locals: {
				title: "Transaction",
				firstName,
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
	const { id, firstName } = req.session.user;
	console.log(`=========${transaction.uid}:${id}`);

	if (transaction.uid == id) {
		res.render("dashboard/transaction/deleteTransaction", {
			// ...layout,
			// locals: {
			// 	title: "Delete Confirmation",
			// 	transaction,
			// },
			partials: {
				...dashboardContent,
				...msgContent,
				deleteTransaction:
					"/partials/transactionView/deleteTransaction",
			},
			locals: {
				title: "Delete Confirmation",
				firstName,
				deleteWhat: transaction.description,
				redirectWhere: "transaction",
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
		// flash message here
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
	showEditTransactionForm,
	processEditTransactionForm,
	showDeleteTransactionForm,
	processDeleteTransactionForm,
};
