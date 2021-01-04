const { layout } = require("../layout")

const home = (req, res) => {
    res.render("home", {
        ...layout,
        locals: {
            title: "T|WIN Homepage",
            errormsg: ""
        }
    })
}

module.exports = {
    home
}