module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      userId: {
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
          as: "userId",
        },
      },
    },
    {
      tableName: "posts",
      timestamps: true,
    }
  );
  Post.associate = (models) => {
    Post.belongsTo(models.user, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return Post;
};
