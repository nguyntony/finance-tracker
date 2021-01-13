"use strict";
const { User } = require("../models");
const { addDecimal } = require("../helper");

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
		return await queryInterface.bulkInsert(
			"Transactions",
			[
				{
					uid: user.id,
					category: "Deposit",
					amount: addDecimal("10000"),
					description: "Paycheck",
					createdAt: new Date(),
					updatedAt: new Date(),
					createdYear: "2021",
					createdMonth: "January",
				},
				{
					uid: user.id,
					category: "Deposit",
					amount: addDecimal("20000"),
					description: "Paycheck",
					createdAt: new Date("2020-03-11"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "March",
				},
				{
					uid: user.id,
					category: "Deposit",
					amount: addDecimal("20000"),
					description: "Startup fund",
					createdAt: new Date("2020-03-11"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "March",
				},
				{
					uid: user.id,
					category: "Bills",
					amount: addDecimal("1000"),
					description: "January rent",
					createdAt: new Date("2020-03-15"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "March",
				},
				{
					uid: user.id,
					category: "Bills",
					amount: addDecimal("1000"),
					description: "February rent",
					createdAt: new Date("2020-03-20"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "March",
				},
				{
					uid: user.id,
					category: "Health",
					amount: 315.25,
					description: "Got injured surfing, medical bills",
					createdAt: new Date("2020-08-10"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "August",
				},
				{
					uid: user.id,
					category: "Shopping",
					amount: 500.25,
					description: "Bought a new wardrobe",
					createdAt: new Date("2020-08-11"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "August",
				},
				{
					uid: user.id,
					category: "Auto",
					amount: 600.25,
					description: "Car insurance",
					createdAt: new Date("2020-08-25"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "August",
				},
				{
					uid: user.id,
					category: "Food",
					amount: 240.99,
					description: "Groceries for Jan.",
					createdAt: new Date("2020-08-25"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "August",
				},
				{
					uid: user.id,
					category: "Savings",
					amount: 15000,
					description: "Transferring funds to Savings",
					createdAt: new Date("2020-08-25"),
					updatedAt: new Date(),
					createdYear: "2020",
					createdMonth: "August",
				},
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
