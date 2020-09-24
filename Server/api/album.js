const { Router } = require('express');
const { Album } = require('../models');
const { Op } = require("sequelize");
const topLimit = 20;
const router = Router();

router.get('/top/', async (req, res) => {
  const allAlbums = await Album.findAll({
    attributes: ['id', ['album_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  res.json(allAlbums)
});

router.get('/search/:searchInput', async (req, res) => {
  const searchResults = await Album.findAll({
    attributes:['id', ['album_name', 'name'], 'cover_img'],
    where: {
     'album_name':{[Op.like]: `%${req.params.searchInput}%`}},
      order: ['likes'],
    limit: topLimit
  });
  console.log(searchResults);
  res.json(searchResults);
})

router.post('/', async (req, res) => {
  const newAlbum = await Album.create(req.body);
  res.json(newAlbum)
})

router.get('/:albumId', async (req, res) => {
  const album = await Album.findByPk(req.params.albumId);
  res.json(album)
})

router.patch('/:albumId', async (req, res) => {
  const album = await Album.findByPk(req.params.albumId);
  await album.update(req.body);
  res.json(album)
})

router.delete('/:albumId', async (req, res) => {
  const album = await Album.findByPk(req.params.albumId);
  await album.destroy();
  res.json({ deleted: true })
})



module.exports = router;
