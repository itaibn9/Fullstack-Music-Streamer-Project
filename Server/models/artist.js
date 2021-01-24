'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Song);
      this.hasMany(models.Album);
      this.belongsTo(models.artist_likes, {
        foreignKey: 'id'
      });
    }
  };
  Artist.init({
    artist_name: DataTypes.STRING,
    cover_img: DataTypes.TEXT,
    description: DataTypes.TEXT,
    likes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Artist',
  });
  return Artist;
};