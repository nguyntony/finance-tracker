const { layout } = require("../../layout")
const { Saving } = require("../../models")

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
    const { title, deadline, total } = req.body

    const newSaving = await Saving.create({
        title,
        deadline,
        total,
        uid: id
    })

    res.redirect("/member/home")
}

module.exports = {
    showSavingForm,
    processSavingForm
}