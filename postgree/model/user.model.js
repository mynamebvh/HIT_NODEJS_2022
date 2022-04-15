const bcrypt = require("bcryptjs");

const db = require("./index");

const Post = db.post;

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        async beforeCreate(user) {
          user.password = await bcrypt.hash(user.password, 8);
        },
      },
      tableName: "users",
      timestamps: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.post, {
      foreignKey: "userId",
      as: "posts",
    });
  };

  return User;
};
