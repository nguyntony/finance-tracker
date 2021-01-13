const moment = require("moment")
const { User } = require("./models")

const createTransactionData = async (category, description) => {
    const data = [];
    let obj = {}
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const users = await User.findAll();
    const user = users[0];


    for (x of months) {
        let amount = Math.random() * 500
        let date = new Date(`${x} 20, 2020`)

        obj = {}
        obj["uid"] = user.id;
        obj["category"] = category;
        obj["amount"] = Number.parseFloat(amount).toFixed(2)
        obj["createdAt"] = new Date(moment(date).format("YYYY-MM-DD"))
        obj["updatedAt"] = new Date()
        obj["createdYear"] = moment(date).format("YYYY")
        obj["createdMonth"] = moment(date).format("MMMM")
        obj["description"] = description

        data.push(obj)
    }

    return data
}

const dashboardContent = {
    header: '/partials/header',
    footer: '/partials/footer',
    dashHeader: "/partials/dashboard/dashHeader",
    dashFooter: "/partials/dashboard/dashFooter",
}

const msgContent = {
    flashMsg: '/partials/flashMsg'
}

const homepageContent = {
    homeHeader: "/partials/homepage/homeHeader",
    homeFooter: "/partials/homepage/homeFooter",
}

const getMessages = (req) => {
    return {
        error: req.flash("error"),
        success: req.flash("success")
    }
}

const addDecimal = (num) => {
    return Number.parseFloat(num).toFixed(2)
}

module.exports = {
    getMessages,
    msgContent,
    addDecimal,
    dashboardContent,
    homepageContent,
    createTransactionData
};
