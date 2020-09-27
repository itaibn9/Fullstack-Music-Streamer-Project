'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album_likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Album, {
        foreignKey: 'album_id'
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  };
  album_likes.init({
    user_id: DataTypes.INTEGER,
    album_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'album_likes',
  });
  return album_likes;
};