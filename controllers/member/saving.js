const { layout } = require("../../helper");
const { Saving, User } = require("../../models");
const numeral = require("numeral")

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

const list = async (req, res) => {
	const { id } = req.session.user
	const user = await User.findByPk(id)
	const getSavings = await user.getSavings()

	const editedSavings = getSavings.map(s => {
		return {
			title: s.title,
			deadline: s.deadline,
			total: s.total ? numeral(s.total).format("$0,0.00") : null,
			progress: s.progress ? numeral(s.progress).format("$0,0.00") : numeral(0).format("$0,0.00"),
			category: s.category
		}
	})

	res.render("saving/list", {
		...layout,
		locals: {
			title: "Savings",
			editedSavings
		}
	})
}

module.exports = {
	showSavingForm,
	processSavingForm,
	list
};
