const { layout } = require("../../layout")
const { Transaction } = require('../../models')

// fn to display the transaction form
const showTransactionForm = (req, res) => {
    res.render("member/transactionForm", {
        ...layout,
        locals: {
            title: "Transaction Form"
        }
    })
}

// fn to process the transaction form
const processTransactionForm = async (req, res) => {
    // need uid
    const { id } = req.session.user
    // need to extract the values from the form
    const { category, amount, description } = req.body;

    // will possibly need to change the amount to a number value and also account for decimal places
    const newTransaction = await Transaction.create({
        category,
        amount,
        description,
        uid: id
    })

    // need to figure out where to redirect the user
    res.redirect("/member/home")
}

module.exports = {
    showTransactionForm,
    processTransactionForm
}