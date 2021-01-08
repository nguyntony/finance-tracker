const { layout } = require("../../helper");
const { Saving, User } = require("../../models");
const numeral = require("numeral");

const showSavingForm = (req, res) => {
	res.render("member/savingForm", {
		...layout,
		locals: {
			title: "Saving Form",
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
	const { id } = req.session.user;
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

	res.render("saving/list", {
		...layout,
		locals: {
			title: "Savings",
			editedSavings,
		},
	});
};

const showEditSavingForm = async (req, res) => {
	const { savingId } = req.params;
	const { id } = req.session.user;
	const saving = await Saving.findByPk(savingId);

	if (saving.uid == id) {
		res.render("dashboard/transaction/savingForm", {
			// ...layout,
			// locals: {
			// 	title: "Edit Saving",
			// 	saving,
			// },
			// REFACTOR THIS
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

module.exports = {
	showSavingForm,
	processSavingForm,
	list,
	showEditSavingForm,
	processEditSavingForm,
};
