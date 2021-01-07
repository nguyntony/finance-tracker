'use strict';
const { User } = require("../models")
const { addDecimal } = require("../layout")

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
    const users = await User.findAll()
    const user = users[0]
    return await queryInterface.bulkInsert("Transactions", [
      {
        uid: user.id,
        category: "deposit",
        amount: addDecimal("10000"),
        description: "paycheck",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "deposit",
        amount: addDecimal("20000"),
        description: "paycheck",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "deposit",
        amount: addDecimal("20000"),
        description: "startup fund",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "bills",
        amount: addDecimal("1000"),
        description: "January rent",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "bills",
        amount: addDecimal("1000"),
        description: "February rent",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "health",
        amount: 315.25,
        description: "Got injured surfing, medical bills",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "shopping",
        amount: 500.25,
        description: "Bought a new wardrobe",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "auto",
        amount: 600.25,
        description: "Car insurance",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "food",
        amount: 240.99,
        description: "Groceries for Jan.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        uid: user.id,
        category: "savings",
        amount: 15000,
        description: "Transferring funds to Savings",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Transactions")
  }
};
