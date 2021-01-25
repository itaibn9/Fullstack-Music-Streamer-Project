const { Router } = require('express');
const { Artist, Song, Album, Sequelize, artist_likes } = require('../models');
const topLimit = 20;
const { Op } = require("sequelize");
const router = Router();

router.get('/top/', async (req, res) => {
  try {
  const allArtists = await Artist.findAll({
    attributes: ['id', ['artist_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  res.json(allArtists);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:artistId/list-of-songs', async (req, res) => {
  try {
  const song = await Song.findAll({
    attributes:[['song_name', 'name'], 'id', 'length'],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where: {
      artistId: [req.params.artistId]
    }
  });
  console.log(song);
  res.json(song);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:artistId/list-of-albums', async (req, res) => {
  try {
  const relatedAlbums = await Album.findAll({
    attributes:[ 'id', 'cover_img'],
    include: [{model:Artist, attributes:[['artist_name', 'name']]}],
    where: {'artistId':{[Op.eq]: req.params.artistId}}
  });
  console.log(relatedAlbums);
  res.json(relatedAlbums);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:artistId/count-likes', async (req, res) => {
  try {
  const countLikes = await artist_likes.findAll({
    attributes:[[Sequelize.fn("COUNT", Sequelize.col("artist_id")), 'countLikes']],
    where:{
      artist_id: [req.params.artistId]
    }
  });
  console.log(countLikes);
  res.json(countLikes);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:artistId', async (req, res) => {
  try {
  const artistById = await Artist.findAll({
    attributes:[['artist_name','name'], 'cover_img', ['createdAt', 'created_at']],
    where:{'id':{[Op.eq]: req.params.artistId}}
  });
  res.json(artistById);
} catch (error) {
  res.status(500).send(error);
}
})


router.get('/search/:searchInput', async (req, res) => {
  try {
  const searchResults = await Artist.findAll({
    attributes:['id', ['artist_name', 'name'], 'cover_img'],
    where: {
     'artist_name':{[Op.like]: `%${req.params.searchInput}%`}},
      order: ['likes'],
    limit: topLimit
  });
  console.log(searchResults);
  res.json(searchResults);
} catch (error) {
  res.status(500).send(error);
}
})

router.post('/', async (req, res) => {
  try {
  const newArtist = await Artist.create(req.body);
  res.json(newArtist);
} catch (error) {
  res.status(500).send(error);
}
})


router.patch('/:artistId', async (req, res) => {
  try {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById);
} catch (error) {
  res.status(500).send(error);
}
})

router.delete('/:artistId', async (req, res) => {
  try {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.destroy();
  res.json({ deleted: true });
} catch (error) {
  res.status(500).send(error);
}
})

module.exports = router;