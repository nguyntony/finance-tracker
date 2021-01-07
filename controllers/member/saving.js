const { layout } = require("../../helper");
const { Saving } = require("../../models");

const showSavingForm = (req, res) => {
	res.render("member/savingForm", {
		...layout,
		locals: {
			title: "Saving Form",
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

module.exports = {
	showSavingForm,
	processSavingForm,
};
