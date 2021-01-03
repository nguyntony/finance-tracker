"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Transactions", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			uid: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			category: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			amount: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("Transactions");
	},
};
