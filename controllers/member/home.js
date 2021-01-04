const { layout } = require("../../layout")

const home = (req, res) => {
    const { firstName } = req.session.user

    res.render("member/home", {
        ...layout,
        locals: {
            title: "Member Homepage",
            firstName
        }
    })
}

module.exports = {
    home
}