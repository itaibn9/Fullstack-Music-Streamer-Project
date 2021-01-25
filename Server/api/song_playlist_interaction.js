const { Router } = require('express');
const { Op } = require("sequelize");
const { Song_Playlist_interaction } = require('../models');
const router = Router();


router.get('/:playlistId', async (req, res) => {
  try {
  const playlistSongsById = await Song_Playlist_interaction.findAll({
    attributes:['playlist_id', 'song_id', ['createdAt', 'created_at']],
    where:{'playlist_id':{[Op.eq]: req.params.playlistId}}
  });
  res.json(playlistSongsById);
} catch (error) {
  res.status(500).send(error);
}
})

router.post('/', async (req, res) => {
  try {
  const newInteraction = await Song_Playlist_interaction.create(req.body);
  res.json(newInteraction);
} catch (error) {
  res.status(500).send(error);
}
})


router.delete('/:interactionId', async (req, res) => {
  try {
  const interaction = await Song_Playlist_interaction.findByPk(req.params.interactionId);
  await interaction.destroy();
  res.json({ deleted: true });
} catch (error) {
  res.status(500).send(error);
}
})

module.exports = router;