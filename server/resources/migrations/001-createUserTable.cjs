module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable('Users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        age: {
          type: Sequelize.INTEGER
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: 'Must be a valid email address',
            },
          },
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false
        },
        status: {
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
      queryInterface.dropTable('Users'),
  }
  