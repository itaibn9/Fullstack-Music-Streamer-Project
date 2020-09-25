const { Router } = require('express');
const { Op } = require("sequelize");
const { Playlist, Song_Playlist_interaction, Song, Artist } = require('../models');
const topLimit = 20;
const router = Router();

router.get('/top/', async (req, res) => {
  const allPlaylists = await Playlist.findAll({
    attributes: ['id', ['playlist_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  res.json(allPlaylists)
})

router.get('/:playlistId/list-of-songs', async (req, res) => {
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
  console.log(songsInPlaylist);
  res.json(songsInPlaylist);
})

router.get('/:playlistId', async (req, res) => {
  const playlistById = await Playlist.findAll({
    attributes:[['playlist_name','name'], 'cover_img', ['createdAt', 'created_at']],
    where:{'id':{[Op.eq]: req.params.playlistId}}
  });
  res.json(playlistById)
})

router.get('/search/:searchInput', async (req, res) => {
  const searchResults = await Playlist.findAll({
    attributes:['id', ['playlist_name', 'name'], 'cover_img'],
    where: {
     'playlist_name':{[Op.like]: `%${req.params.searchInput}%`}},
      order: ['likes'],
    limit: topLimit
  });
  console.log(searchResults);
  res.json(searchResults);
})

router.post('/', async (req, res) => {
  const newPlaylist = await Playlist.create(req.body);
  res.json(newPlaylist)
})

router.get('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  res.json(playlist)
})

router.patch('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  await playlist.update(req.body);
  res.json(playlist)
})

router.delete('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  await playlist.destroy();
  res.json({ deleted: true })
})

module.exports = router;