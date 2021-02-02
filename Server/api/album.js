const { Router } = require('express');
const { Album, Song, Artist, Sequelize, album_likes } = require('../models');
const { Op } = require("sequelize");
const topLimit = 20;
const router = Router();

router.get('/top/', async (req, res) => {
  try {
  const allAlbums = await Album.findAll({
    attributes: ['id', ['album_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  res.json(allAlbums);
} catch (error) {
  res.status(500).send(error);
}
});

router.get('/:albumId/list-of-songs', async (req, res) => {
  try {
  const songsInAlbum = await Song.findAll({
    attributes:[['song_name', 'name'], 'id', 'length'],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where: {
      albumId: [req.params.albumId]
    }
  });
  res.json(songsInAlbum);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/search/:searchInput', async (req, res) => {
  try {
  const searchResults = await Album.findAll({
    attributes:['id', ['album_name', 'name'], 'cover_img'],
    where: {
     'album_name':{[Op.like]: `%${req.params.searchInput}%`}},
      order: ['likes'],
    limit: topLimit
  });
  res.json(searchResults);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:albumId/count-likes', async (req, res) => {
  try {
  const countLikes = await album_likes.findAll({
    attributes:[[Sequelize.fn("COUNT", Sequelize.col("album_id")), 'countLikes']],
    where:{
      album_id: [req.params.albumId]
    }
  });
  res.json(countLikes);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:albumId', async (req, res) => {
  try {
  const albumById = await Album.findAll({
    attributes:[['album_name','name'], 'cover_img', ['createdAt', 'created_at']],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where:{'id':{[Op.eq]: req.params.albumId}}
  });
  res.json(albumById);
} catch (error) {
  res.status(500).send(error);
}
})

router.post('/', async (req, res) => {
  try {
  const newAlbum = await Album.create(req.body);
  res.json(newAlbum);
} catch (error) {
  res.status(500).send(error);
}
})


router.patch('/:albumId', async (req, res) => {
  try {
  const album = await Album.findByPk(req.params.albumId);
  await album.update(req.body);
  res.json(album);
} catch (error) {
  res.status(500).send(error);
}
})

router.delete('/:albumId', async (req, res) => {
  try {
  const album = await Album.findByPk(req.params.albumId);
  await album.destroy();
  res.json({ deleted: true });
} catch (error) {
  res.status(500).send(error);
}
})



module.exports = router;
