require("dotenv").config();
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

const main = async () => {
    const y = await createTransactionData("Bills", "Monthly bills")
    console.log(y)
}

main()



// const yArr = [...y]
// console.log(yArr)

			// [
			// 	{
			// 		uid: user.id,
			// 		category: "Deposit",
			// 		amount: addDecimal("10000"),
			// 		description: "Paycheck",
			// 		createdAt: new Date(),
			// 		updatedAt: new Date(),
			// 		createdYear: "2021",
			// 		createdMonth: "January",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Deposit",
			// 		amount: addDecimal("20000"),
			// 		description: "Paycheck",
			// 		createdAt: new Date("2020-03-11"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "March",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Deposit",
			// 		amount: addDecimal("20000"),
			// 		description: "Startup fund",
			// 		createdAt: new Date("2020-03-11"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "March",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Bills",
			// 		amount: addDecimal("1000"),
			// 		description: "January rent",
			// 		createdAt: new Date("2020-03-15"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "March",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Bills",
			// 		amount: addDecimal("1000"),
			// 		description: "February rent",
			// 		createdAt: new Date("2020-03-20"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "March",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Health",
			// 		amount: 315.25,
			// 		description: "Got injured surfing, medical bills",
			// 		createdAt: new Date("2020-08-10"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "August",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Shopping",
			// 		amount: 500.25,
			// 		description: "Bought a new wardrobe",
			// 		createdAt: new Date("2020-08-11"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "August",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Auto",
			// 		amount: 600.25,
			// 		description: "Car insurance",
			// 		createdAt: new Date("2020-08-25"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "August",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Food",
			// 		amount: 240.99,
			// 		description: "Groceries for Jan.",
			// 		createdAt: new Date("2020-08-25"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "August",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Savings",
			// 		amount: 15000,
			// 		description: "Transferring funds to Savings",
			// 		createdAt: new Date("2020-08-25"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "August",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Bills",
			// 		amount: 500,
			// 		description: "Water and Electricity bill",
			// 		createdAt: new Date("2020-01-20"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "January",
			// 	},
			// 	{
			// 		uid: user.id,
			// 		category: "Bills",
			// 		amount: 500,
			// 		description: "Water and Electricity bill",
			// 		createdAt: new Date("2020-01-20"),
			// 		updatedAt: new Date(),
			// 		createdYear: "2020",
			// 		createdMonth: "January",
			// 	},
			// ],