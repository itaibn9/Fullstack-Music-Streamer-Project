'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId'
      });
      this.belongsTo(models.Album,{
        foreignKey: 'albumId'
      });
    }
  };
  Song.init({
    song_name: DataTypes.STRING,
    albumId: DataTypes.INTEGER,
    artistId: DataTypes.INTEGER,
    lyric: DataTypes.TEXT,
    youtubeLink: DataTypes.STRING,
    length: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    cover_img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};