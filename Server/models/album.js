'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Song);
      this.belongsTo(models.Artist, {
        foreignKey: 'artistId'
      });
    }
  };
  Album.init({
    album_name: DataTypes.STRING,
    artistId: DataTypes.INTEGER,
    youtubeLink: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    cover_img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};