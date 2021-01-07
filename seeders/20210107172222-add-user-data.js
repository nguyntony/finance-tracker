'use strict';

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
    return await queryInterface.bulkInsert("Users", [
      {
        username: "tester",
        hash: "$2a$10$qj.lITVk0berjRBEKsMdWudTvGhwQAsoY1dtrg52HchsNOhcouxJO",
        firstName: "Steven",
        lastName: "Universe",
        email: "steven@mail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete("Users")
  }
};
