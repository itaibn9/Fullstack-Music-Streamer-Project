'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class song_likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Song, {
        foreignKey: 'song_id'
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  };
  song_likes.init({
    user_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'song_likes',
  });
  return song_likes;
};