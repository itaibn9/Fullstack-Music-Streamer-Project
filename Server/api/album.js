const { Router } = require('express');
const { Album, Song, Artist } = require('../models');
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

router.get('/:albumId/list-of-songs', async (req, res) => {
  const songsInAlbum = await Song.findAll({
    attributes:[['song_name', 'name'], 'id', 'length'],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where: {
      albumId: [req.params.albumId]
    }
  });
  console.log(songsInAlbum);
  res.json(songsInAlbum);
})

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

router.get('/:albumId', async (req, res) => {
  const albumById = await Album.findAll({
    attributes:[['album_name','name'], 'cover_img', ['createdAt', 'created_at']],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where:{'id':{[Op.eq]: req.params.albumId}}
  });
  res.json(albumById)
})

router.post('/', async (req, res) => {
  const newAlbum = await Album.create(req.body);
  res.json(newAlbum)
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
