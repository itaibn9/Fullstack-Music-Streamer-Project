'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.song_likes, {
        foreignKey: 'id'
      });
      this.belongsTo(models.playlist_likes, {
        foreignKey: 'id'
      });
      this.belongsTo(models.artist_likes, {
        foreignKey: 'id'
      });
      this.belongsTo(models.album_likes, {
        foreignKey: 'id'
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};