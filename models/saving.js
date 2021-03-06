"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Saving extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Saving.belongsTo(models.User, {
				foreignKey: "uid",
				onDelete: "CASCADE",
			});
			// define association here
		}
	}
	Saving.init(
		{
			uid: DataTypes.INTEGER,
			title: DataTypes.STRING,
			deadline: DataTypes.DATEONLY,
			total: DataTypes.DECIMAL(10, 2),
			progress: DataTypes.DECIMAL(10, 2),
			category: DataTypes.STRING,
			pinned: DataTypes.BOOLEAN,
		},
		{
			sequelize,
			modelName: "Saving",
		}
	);
	return Saving;
};
