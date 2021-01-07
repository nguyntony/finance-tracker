const { layout, partialContent, msgContent, getMessages } = require("../../layout")

const home = (req, res) => {
    const { firstName } = req.session.user

    res.render("member/home", {
        // ...layout,
        // locals: {
        //     title: "Member Homepage",
        //     firstName
        // }
        partials: {
            ...partialContent,
            ...msgContent
        },
        locals: {
            title: "Member Homepage",
            firstName,
            messages: getMessages(req)
        }
    })
}

module.exports = {
    home
}