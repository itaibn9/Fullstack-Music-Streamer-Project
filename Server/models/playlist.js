'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Song_Playlist_interaction, {
        foreignKey: 'id'
      });
      this.belongsTo(models.playlist_likes, {
        foreignKey: 'id'
      });
    }
  };
  Playlist.init({
    playlist_name: DataTypes.STRING,
    description: DataTypes.TEXT,
    cover_img: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};