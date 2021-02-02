const { Router } = require('express');
const { Op } = require("sequelize");
const { Playlist, playlist_likes, Song_Playlist_interaction } = require('../models');
const topLimit = 20;
const router = Router();

router.get('/top/', async (req, res) => {
  try {
  const allPlaylists = await Playlist.findAll({
    attributes: ['id', ['playlist_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  res.json(allPlaylists);
} catch (error) {
  console.log(error)
  res.status(500).send(error);
}
})

router.get('/:playlistId/count-likes', async (req, res) => {
  try {
  const countLikes = await playlist_likes.findAll({
    attributes:[[Sequelize.fn("COUNT", Sequelize.col("playlist_id")), 'countLikes']],
    where:{
      playlist_id: [req.params.playlistId]
    }
  });
  res.json(countLikes);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:playlistId/list-of-songs', async (req, res) => {
  try {
  let songsInPlaylist = await Song_Playlist_interaction.findAll({
    attributes:['song_id'],
    include: [
      {model:Song,
       attributes: [['song_name', 'name'], 'length', 'id'],
       include: [
         {model:Artist,
          attributes:['artist_name']}
       ]},
    ],
    where:{'playlist_id':{[Op.eq]: req.params.playlistId}}
  });
  songsInPlaylist = songsInPlaylist.map((song) => song.Song)
  res.json(songsInPlaylist);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:playlistId', async (req, res) => {
  try {
  const playlistById = await Playlist.findAll({
    attributes:[['playlist_name','name'], 'cover_img', ['createdAt', 'created_at']],
    where:{'id':{[Op.eq]: req.params.playlistId}}
  });
  res.json(playlistById);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/search/:searchInput', async (req, res) => {
  try {
  const searchResults = await Playlist.findAll({
    attributes:['id', ['playlist_name', 'name'], 'cover_img'],
    where: {
     'playlist_name':{[Op.like]: `%${req.params.searchInput}%`}},
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
  const newPlaylist = await Playlist.create(req.body);
  res.json(newPlaylist);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:playlistId', async (req, res) => {
  try {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  res.json(playlist);
} catch (error) {
  res.status(500).send(error);
}
})

router.patch('/:playlistId', async (req, res) => {
  try {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  await playlist.update(req.body);
  res.json(playlist)
} catch (error) {
  res.status(500).send(error);
}
})

router.delete('/:playlistId', async (req, res) => {
  try {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  await playlist.destroy();
  res.json({ deleted: true });
} catch (error) {
  res.status(500).send(error);
}
})

module.exports = router;