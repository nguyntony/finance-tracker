"use strict";
const { User } = require("../models");
const { addDecimal, createTransactionData } = require("../helper");
const moment = require("moment")

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const users = await User.findAll();
		const user = users[0];
		const bills = await createTransactionData("Bills", "Monthly bills");
		const auto = await createTransactionData("Auto", "Car broke down..again")
		const health = await createTransactionData("Health", "Ouch!")
		const food = await createTransactionData("Food", "I'm hungry")
		const food1 = await createTransactionData("Food", "Girls night out")
		const food2 = await createTransactionData("Food", "Groceries")
		const shopping = await createTransactionData("Shopping", "Shopping Spree!")
		const shopping1 = await createTransactionData("Shopping", "Buying gifts")
		const other = await createTransactionData("Other", "I dunno what happened")
		const saving = await createTransactionData("Savings", "Trying to be good")
		const deposit = await createTransactionData("Deposit", "Paycheck")
		const deposit1 = await createTransactionData("Deposit", "Rain on me")
		const deposit2 = await createTransactionData("Deposit", "Moneyyyyy")

		return await queryInterface.bulkInsert(
			"Transactions",
			[
				...bills,
				...auto,
				...health,
				...food,
				...food1,
				...food2,
				...shopping,
				...shopping1,
				...other,
				...saving,
				...deposit,
				...deposit1,
				...deposit2,
				{
					uid: user.id,
					category: "Deposit",
					amount: addDecimal("50000"),
					description: "Startup fund",
					createdAt: new Date("2020-03-11"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "March",
				},
				{
					uid: user.id,
					category: "Bills",
					amount: addDecimal("300"),
					description: "Rent",
					createdAt: new Date(),
					updatedAt: new Date(),
					createdYear: "2021",
					createdMonth: "January",
				},
				{
					uid: user.id,
					category: "Food",
					amount: addDecimal("50"),
					description: "Zaxby's",
					createdAt: new Date(),
					updatedAt: new Date(),
					createdYear: "2021",
					createdMonth: "January",
				},
				{
					uid: user.id,
					category: "Food",
					amount: addDecimal("80"),
					description: "Sushi roll night",
					createdAt: new Date(),
					updatedAt: new Date(),
					createdYear: "2021",
					createdMonth: "January",
				},
				{
					uid: user.id,
					category: "Shopping",
					amount: addDecimal("201"),
					description: "Bought some clothes",
					createdAt: new Date(),
					updatedAt: new Date(),
					createdYear: "2021",
					createdMonth: "January",
				}
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return await queryInterface.bulkDelete("Transactions");
	},
};
