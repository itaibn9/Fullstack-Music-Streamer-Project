const { Router } = require('express');
const { Op } = require("sequelize");
const { Song_Playlist_interaction } = require('../models');
const router = Router();


router.get('/:playlistId', async (req, res) => {
  const playlistSongsById = await Song_Playlist_interaction.findAll({
    attributes:['playlist_id', 'song_id', ['createdAt', 'created_at']],
    where:{'playlist_id':{[Op.eq]: req.params.playlistId}}
  });
  res.json(playlistSongsById)
})

router.post('/', async (req, res) => {
  const newInteraction = await Song_Playlist_interaction.create(req.body);
  res.json(newInteraction)
})


router.delete('/:interactionId', async (req, res) => {
  const interaction = await Song_Playlist_interaction.findByPk(req.params.interactionId);
  await interaction.destroy();
  res.json({ deleted: true })
})

module.exports = router;