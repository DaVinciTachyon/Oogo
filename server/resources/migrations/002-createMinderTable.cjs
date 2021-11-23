module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Minders', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
          experience: {
            type: Sequelize.DECIMAL,
            allowNull: false
          },
          qualifications: {
            type: Sequelize.STRING,
            allowNull: false
          },
          rate: {
            type: Sequelize.DECIMAL,
            allowNull: false
          },
          transport: {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          inHome: {
            type: Sequelize.BOOLEAN,
            allowNull: false
          },
          description: {
            type: Sequelize.STRING,
            allowNull: false
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
      queryInterface.dropTable('Minders'),
  }
  