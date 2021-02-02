const { Router } = require('express');
const { Op } = require("sequelize");
const { Song, Sequelize } = require('../models');
const { Artist, song_likes } = require('../models');
const topLimit = 20;
const router = Router();

router.get('/top/', async (req, res) => {
  try{
  const allSongs = await Song.findAll({
    attributes: ['id', ['song_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  res.json(allSongs);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:songId/count-likes', async (req, res) => {
  try {
  const countLikes = await song_likes.findAll({
    attributes:[[Sequelize.fn("COUNT", Sequelize.col("song_id")), 'countLikes']],
    where:{
      song_id: [req.params.songId]
    }
  });
  res.json(countLikes);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:songId', async (req, res) => {
  try {
  const song = await Song.findAll({
    attributes:['song_name', 'lyric','youtubeLink', 'createdAt', 'length','id'],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where: {
      id: [req.params.songId]
    }
  });
  res.json(song);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/search/:searchInput', async (req, res) => {
  try {
  const searchResults = await Song.findAll({
    attributes:['id', ['song_name', 'name'], 'cover_img'],
    where: {
     'song_name':{[Op.like]: `%${req.params.searchInput}%`}},
      order: ['likes'],
    limit: topLimit
  });
  res.json(searchResults);
} catch (error) {
  res.status(500).send(error);
}
})


router.post('/', async (req, res) => {
  try {
  const newSong = await Song.create(req.body);
  res.json(newSong)
} catch (error) {
  res.status(500).send(error);
}
})

router.patch('/:songId', async (req, res) => {
  try {
  const song = await Song.findByPk(req.params.songId);
  await song.update(req.body);
  res.json(song);
} catch (error) {
  res.status(500).send(error);
}
})

router.delete('/:songId', async (req, res) => {
  try {
  const song = await Song.findByPk(req.params.songId);
  await song.destroy();
  res.json({ deleted: true })
} catch (error) {
  res.status(500).send(error);
}
})


module.exports = router;