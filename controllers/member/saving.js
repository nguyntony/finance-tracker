const { NIL } = require("uuid")
const { layout } = require("../../layout")
const { Saving } = require('../../models')

const showSavingForm = (req, res) => {
    res.render("member/savingForm", {
        ...layout,
        locals: {
            title: "Saving Form"
        }
    })
}

const processSavingForm = async (req, res) => {
    const { id } = req.session.user
    let { title, deadline, total, category } = req.body

    if (!total) {
        total = null
    }
    if (!deadline) {
        deadline = null
    }

    const newSaving = await Saving.create({
        title,
        deadline,
        total,
        category,
        uid: id,
    })

    res.redirect("/member/home")
}

module.exports = {
    showSavingForm,
    processSavingForm
}