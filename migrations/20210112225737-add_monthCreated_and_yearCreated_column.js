"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Transactions", "createdYear", {
			type: Sequelize.STRING,
			allowNull: false,
		});
		await queryInterface.addColumn("Transactions", "createdMonth", {
			type: Sequelize.STRING,
			allowNull: false,
		});
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Transactions", "createdYear");
		await queryInterface.removeColumn("Transactions", "createdMonth");
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
