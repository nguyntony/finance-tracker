const { dashboardContent, msgContent, getMessages } = require("../../helper");
const { Saving, User } = require("../../models");
const numeral = require("numeral");

const showSavingForm = (req, res) => {
	const { firstName, lastName } = req.session.user;

	res.render("dashboard/saving/savingForm", {
		partials: {
			...dashboardContent,
			savingForm: "/partials/dashboard/savingView/savingForm",
		},
		locals: {
			title: "Saving Form",
			lastName,
			firstName,
			saving: null,
		},
	});
};

const processSavingForm = async (req, res) => {
	const { id } = req.session.user;
	let { title, deadline, total, category } = req.body;

	if (!total) {
		total = null;
	}
	if (!deadline) {
		deadline = null;
	}

	const newSaving = await Saving.create({
		title,
		deadline,
		total,
		category,
		uid: id,
	});

	req.session.flash = { success: "Your savings goal has been added." };
	req.session.save(() => {
		res.redirect("/member/home");
	});
};

const list = async (req, res) => {
	const { id, firstName, lastName } = req.session.user;
	const user = await User.findByPk(id);
	const getSavings = await user.getSavings({
		order: [["createdAt", "desc"]],
	});

	const editedSavings = getSavings.map((s) => {
		return {
			id: s.id,
			title: s.title,
			deadline: s.deadline,
			total: s.total ? numeral(s.total).format("$0,0.00") : null,
			progress: s.progress
				? numeral(s.progress).format("$0,0.00")
				: numeral(0).format("$0,0.00"),
			category: s.category,
		};
	});

	res.render("dashboard/saving/savingList", {
		partials: {
			...dashboardContent,
			savingList: "/partials/dashboard/savingView/list",
		},
		locals: {
			title: "Savings",
			firstName,
			lastName,
			editedSavings,
		},
	});
};

const showEditSavingForm = async (req, res) => {
	const { savingId } = req.params;
	const { id, firstName, lastName } = req.session.user;
	const saving = await Saving.findByPk(savingId);

	if (saving.uid == id) {
		res.render("dashboard/saving/savingForm", {
			partials: {
				...dashboardContent,
				savingForm: "/partials/dashboard/savingView/savingForm",
			},
			locals: {
				title: "Edit Saving",
				saving,
				firstName,
				lastName,
			},
		});
	} else {
		res.redirect("/member/home");
	}
};

const processEditSavingForm = async (req, res) => {
	const { savingId } = req.params;
	let { category, title, deadline, total } = req.body;

	if (!total) {
		total = null;
	}
	if (!deadline) {
		deadline = null;
	}

	const findSaving = await Saving.findByPk(savingId);
	findSaving.update({ category, title, deadline, total });

	res.redirect("/member/saving/list");
};

const showDeleteSavingForm = async (req, res) => {
	const { savingId } = req.params;
	const saving = await Saving.findByPk(savingId);
	const { id, firstName, lastName } = req.session.user;

	if (saving.uid == id) {
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
				deleteWhat: saving.title,
				messages: getMessages(req),
			},
		});
	} else {
		res.redirect("/member/home");
	}
};

const showAllocationForm = async (req, res) => {
	const { id, firstName, lastName } = req.session.user;
	const user = await User.findByPk(id);
	const saving = await user.getSavings();

	res.render("dashboard/saving/allocationForm", {
		partials: {
			...dashboardContent,
			allocationForm: "/partials/dashboard/savingView/allocationForm",
		},
		locals: {
			firstName,
			lastName,
			title: "Allocate Savings",
			saving,
		},
	});
};

const processAllocationForm = async (req, res) => {
	const { id } = req.session.user;
	let { savingId, progress } = req.body;
	const saving = await Saving.findByPk(savingId);
	const user = await User.findByPk(id);

	// Gets the total saving funds
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

	if (saving.uid == id) {
		// Compares allocation amount to the total of the goal
		if (
			saving.total !== null &&
			Number(saving.total) -
				(Number(saving.progress) + Number(progress)) <
				0
		) {
			progress = Number(saving.total) - Number(saving.progress);
		} else {
			progress = Number(saving.progress) + Number(progress);
		}

		// Compares allocation amount to how much is in saving funds
		if (Number(progress) > totalSavings) {
			progress = Number(saving.progress) + totalSavings;
		}

		saving.update({ progress });
		res.redirect("/member/saving/list");
	}
};

module.exports = {
	showSavingForm,
	processSavingForm,
	list,
	showEditSavingForm,
	processEditSavingForm,
	showDeleteSavingForm,
	showAllocationForm,
	processAllocationForm,
};
