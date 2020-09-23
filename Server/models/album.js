'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  album.init({
    album_name: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    youtubeLink: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    cover_img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'album',
  });
  return album;
};