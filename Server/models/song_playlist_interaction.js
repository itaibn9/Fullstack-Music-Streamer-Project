'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song_Playlist_interaction extends Model {
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
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlist_id'
      });
    }
  };
  Song_Playlist_interaction.init({
    song_id: DataTypes.INTEGER,
    playlist_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Song_Playlist_interaction',
  });
  return Song_Playlist_interaction;
};