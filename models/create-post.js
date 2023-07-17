"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
      this.hasMany(models.Comment, { onDelete: "CASCADE" });
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validation: {
          len: {
            args: [3, 50],
            msg: "Title must be between 3 and 50 characters long.",
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validation: {
          len: {
            args: [1, 500],
            msg: "Content must be between 1 and 500 characters long.",
          },
        },
      },
      UserID: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    }
  );
  return Post;
};