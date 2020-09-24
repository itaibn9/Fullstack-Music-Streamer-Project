const { Router } = require('express');
const { Op } = require("sequelize");
const { Song } = require('../models');
const { Artist } = require('../models');
const topLimit = 20;
const router = Router();

router.get('/top/', async (req, res) => {
  const allSongs = await Song.findAll({
    attributes: ['id', ['song_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  console.log(allSongs);
  res.json(allSongs);
})

router.get('/:songId', async (req, res) => {
  const song = await Song.findAll({
    attributes:['song_name', 'lyric','youtubeLink', 'createdAt', 'length','likes'],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where: {
      id: [req.params.songId]
    }
  });
  console.log(song);
  res.json(song);
})

router.get('/search/:searchInput', async (req, res) => {
  const searchResults = await Song.findAll({
    attributes:['id', ['song_name', 'name'], 'cover_img'],
    where: {
     'song_name':{[Op.like]: `%${req.params.searchInput}%`}},
      order: ['likes'],
    limit: topLimit
  });
  console.log(searchResults);
  res.json(searchResults);
})


router.post('/', async (req, res) => {
  const newSong = await Song.create(req.body);
  res.json(newSong)
})


router.patch('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  await song.update(req.body);
  res.json(song)
})

router.delete('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  await song.destroy();
  res.json({ deleted: true })
})


module.exports = router;