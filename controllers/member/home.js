const { layout } = require("../../layout")

const home = (req, res) => {
    res.render("member/home", {
        ...layout,
        locals: {
            title: "Member Homepage"
        }
    })
}

module.exports = {
    home
}