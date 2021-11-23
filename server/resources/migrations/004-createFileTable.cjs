module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Files', {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true
          },
          type: {
              type: Sequelize.STRING,
              allowNull: false,
              primaryKey: true
          },
          fieldname: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          originalname: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          encoding: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          mimetype: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          destination: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          filename: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          path: {
              type: Sequelize.STRING,
              allowNull: false,
          },
          size: {
              type: Sequelize.INTEGER,
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
      queryInterface.dropTable('Files'),
  }
  