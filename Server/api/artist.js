const { Router } = require('express');
const { Artist, Song, Album } = require('../models');
const topLimit = 20;
const { Op } = require("sequelize");
const router = Router();

router.get('/top/', async (req, res) => {
  const allArtists = await Artist.findAll({
    attributes: ['id', ['artist_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  res.json(allArtists)
})

router.get('/:artistId/list-of-songs', async (req, res) => {
  const song = await Song.findAll({
    attributes:[['song_name', 'name'], 'id', 'length'],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where: {
      artistId: [req.params.artistId]
    }
  });
  console.log(song);
  res.json(song);
})

router.get('/:artistId/list-of-albums', async (req, res) => {
  const relatedAlbums = await Album.findAll({
    attributes:[ 'id', 'cover_img'],
    include: [{model:Artist, attributes:[['artist_name', 'name']]}],
    where: {'artistId':{[Op.eq]: req.params.artistId}}
  });
  console.log(relatedAlbums);
  res.json(relatedAlbums);
})

router.get('/:artistId', async (req, res) => {
  const artistById = await Artist.findAll({
    attributes:[['artist_name','name'], 'cover_img', ['createdAt', 'created_at']],
    where:{'id':{[Op.eq]: req.params.artistId}}
  });
  res.json(artistById)
})


router.get('/search/:searchInput', async (req, res) => {
  const searchResults = await Artist.findAll({
    attributes:['id', ['artist_name', 'name'], 'cover_img'],
    where: {
     'artist_name':{[Op.like]: `%${req.params.searchInput}%`}},
      order: ['likes'],
    limit: topLimit
  });
  console.log(searchResults);
  res.json(searchResults);
})

router.post('/', async (req, res) => {
  const newArtist = await Artist.create(req.body);
  res.json(newArtist)
})


router.patch('/:artistId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById)
})

router.delete('/:artistId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.destroy();
  res.json({ deleted: true })
})

module.exports = router;