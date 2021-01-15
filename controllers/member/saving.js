const { dashboardContent, msgContent, getMessages } = require("../../helper");
const { Saving, User } = require("../../models");
const numeral = require("numeral");
const moment = require("moment");

const checkTotalSavings = async (req, res) => {
	const { id } = req.session.user;
	let { savingId, progress } = req.body;
	const saving = await Saving.findByPk(savingId);
	const user = await User.findByPk(id);

	const allSavingDeposits = await user.getTransactions({
		where: {
			category: "Savings",
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

	const editedSavings = numeral(totalSavings).format("$0,0.00");

	return { totalSavings, editedSavings };
};

const showSavingForm = (req, res) => {
	const { firstName, lastName } = req.session.user;

	res.render("dashboard/saving/savingForm", {
		partials: {
			...dashboardContent,
			savingForm: "/partials/dashboard/savingView/savingForm",
		},
		locals: {
			title: "Savings",
			lastName,
			firstName,
			saving: null,
			h2: "Start Savings Goal",
		},
	});
};

const processSavingForm = async (req, res) => {
	const { id } = req.session.user;
	let { title, deadline, total, category } = req.body;

	// All new titles will have the first word uppercased.
	title = title.charAt(0).toUpperCase() + title.slice(1);

	if (!deadline) {
		deadline = null;
	}

	const newSaving = await Saving.create({
		title,
		deadline,
		total,
		category,
		progress: 0,
		uid: id,
	});

	res.redirect("/member/saving/list");
};

const list = async (req, res) => {
	const { id, firstName, lastName } = req.session.user;
	const user = await User.findByPk(id);
	const getSavings = await user.getSavings({
		order: [["createdAt", "desc"]],
	});

	const editedSavings = getSavings.map((s) => {
		let remaining = null;
		let today = [];
		todayAll = new Date();
		today.push(todayAll.getFullYear());
		today.push(todayAll.getMonth() + 1);
		today.push(todayAll.getDate());
		if (s.deadline) {
			const oneDay = 24 * 60 * 60 * 1000;
			const deadlineDay = s.deadline.split("-");

			const firstDate = new Date(deadlineDay);
			const secondDate = new Date(today);

			remaining = Math.round(Math.abs((firstDate - secondDate) / oneDay));

			if (remaining < 0) {
				remaining = 0;
			}
		}

		const percent = (s.progress / s.total) * 100;

		return {
			id: s.id,
			title: s.title,
			deadline: s.deadline
				? moment(s.deadline).format("MMMM D, YYYY")
				: null,
			total: s.total ? numeral(s.total).format("$0,0.00") : null,
			progress: s.progress
				? numeral(s.progress).format("$0,0.00")
				: numeral(0).format("$0,0.00"),
			category: s.category,
			remaining,
			percent,
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
				title: "Savings",
				saving,
				firstName,
				lastName,
				h2: "Edit Savings Goal",
			},
		});
	} else {
		res.redirect("/member/home");
	}
};

const processEditSavingForm = async (req, res) => {
	const { savingId } = req.params;
	let { category, title, deadline, total } = req.body;

	// All edited titles will have the first word uppercased.
	title = title.charAt(0).toUpperCase() + title.slice(1);

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

const processDeleteSavingForm = async (req, res) => {
	const { savingId } = req.params;
	const saving = await Saving.findByPk(savingId);
	const { deletion } = req.body;

	if (deletion == "Delete") {
		saving.destroy();
		res.redirect("/member/saving/list");
	} else {
		(req.session.flash = {
			error: "Your entry does not match. Please try again.",
		}),
			req.session.save(() => {
				res.redirect(`/member/saving/delete/${savingId}`);
			});
	}
};

const showAllocationForm = async (req, res) => {
	const { id, firstName, lastName } = req.session.user;
	const user = await User.findByPk(id);
	const saving = await user.getSavings();

	const totalSavings = await checkTotalSavings(req, res);
	const editedSavings = totalSavings.editedSavings;

	res.render("dashboard/saving/allocationForm", {
		partials: {
			...dashboardContent,
			allocationForm: "/partials/dashboard/savingView/allocationForm",
		},
		locals: {
			firstName,
			lastName,
			title: "Savings",
			saving,
			editedSavings,
		},
	});
};

const processAllocationForm = async (req, res) => {
	const { id } = req.session.user;
	let { savingId, progress } = req.body;
	const saving = await Saving.findByPk(savingId);
	const user = await User.findByPk(id);

	let totalSavings = await checkTotalSavings(req, res);
	totalSavings = totalSavings.totalSavings;

	if (saving.uid == id) {
		// Compares allocation amount to how much is in saving funds
		if (Number(progress) > totalSavings) {
			progress = Number(saving.progress) + totalSavings;
		}
		// Compares allocation amount to the total of the goal
		if (
			// If the total is a number and if adding the new progress amount doesn't make the total go below 0.
			saving.total !== null &&
			Number(saving.total) -
			(Number(saving.progress) + Number(progress)) <
			0
		) {
			progress = Number(saving.total);
		} else {
			progress = Number(saving.progress) + Number(progress);
		}

		saving.update({ progress });
		res.redirect("/member/saving/list");
	} else {
		res.redirect("/");
	}
};

const showReallocationForm = async (req, res) => {
	const { savingId } = req.params;
	const { id, firstName, lastName } = req.session.user;
	const saving = await Saving.findByPk(savingId);

	let editedSavings = await checkTotalSavings(req, res);
	editedSavings = editedSavings.editedSavings;

	if (saving.uid == id) {
		res.render("dashboard/saving/reallocationForm", {
			partials: {
				...dashboardContent,
				reallocationForm:
					"/partials/dashboard/savingView/reallocationForm",
			},
			locals: {
				firstName,
				lastName,
				title: "Savings",
				saving,
				editedSavings,
			},
		});
	}
};

const processReallocationForm = async (req, res) => {
	const { id } = req.session.user;
	const { savingId } = req.params;
	let { progress } = req.body;
	const saving = await Saving.findByPk(savingId);
	const user = await User.findByPk(id);

	if (saving.uid == id) {
		saving.update({ progress });
		res.redirect("/member/saving/list");
	} else {
		res.redirect("/");
	}
};

const pinnedGoal = async (req, res) => {
	const { id } = req.session.user
	const { goalId } = req.params
	const user = await User.findByPk(id)
	const isPinned = await user.getSavings({
		where: {
			pinned: true
		}
	})

	const goal = await Saving.findByPk(goalId)

	if (isPinned.length == 0) {
		goal.update({ pinned: true })
	} else {
		isPinned[0].update({ pinned: false })
		goal.update({ pinned: true })
	}

	req.session.flash = { success: `${goal.title} has been pinned.` }
	req.session.save(() => res.redirect("/member/home"))
}

module.exports = {
	showSavingForm,
	processSavingForm,
	list,
	showEditSavingForm,
	processEditSavingForm,
	showDeleteSavingForm,
	processDeleteSavingForm,
	showAllocationForm,
	processAllocationForm,
	showReallocationForm,
	processReallocationForm,
	pinnedGoal
};
