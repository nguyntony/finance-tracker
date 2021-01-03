"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Transaction extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Transaction.belongsTo(models.User, {
				foreignKey: "uid",
				onDelete: "CASCADE",
			});
			// define association here
		}
	}
	Transaction.init(
		{
			uid: DataTypes.INTEGER,
			category: DataTypes.STRING,
			amount: DataTypes.INTEGER,
			description: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Transaction",
		}
	);
	return Transaction;
};
