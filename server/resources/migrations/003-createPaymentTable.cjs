module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Payments', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          iban: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
          },
      }),
    down: (queryInterface, _Sequelize) =>
      queryInterface.dropTable('Payments'),
  }
  