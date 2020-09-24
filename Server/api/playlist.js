const { Router } = require('express');
const { Op } = require("sequelize");
const { Playlist } = require('../models');
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