'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artist_likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist, {
        foreignKey: 'artist_id'
      });
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
    }
  };
  artist_likes.init({
    user_id: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'artist_likes',
  });
  return artist_likes;
};