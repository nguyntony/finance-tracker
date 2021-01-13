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
			"Savings",
			[
				{
					uid: user.id,
					title: "Dream Car",
					deadline: "2022/01/01",
					total: addDecimal("10000"),
					category: "Car",
					createdAt: new Date("2020-01-19"),
					updatedAt: new Date(),
					progress: 0
				},
				{
					uid: user.id,
					title: "iPad Pro",
					total: addDecimal("800"),
					category: "Item",
					createdAt: new Date("2021-01-01"),
					updatedAt: new Date(),
					progress: 0
				},
				{
					uid: user.id,
					title: "Townhouse",
					total: addDecimal("25000"),
					category: "Home",
					createdAt: new Date("2020-06-25"),
					updatedAt: new Date(),
					progress: 0
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
		return await queryInterface.bulkDelete("Savings");
	},
};
