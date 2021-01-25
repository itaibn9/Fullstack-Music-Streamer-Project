const { Router } = require('express');
const { playlist_likes } = require('../models');
const router = Router();

router.get('/:userId/:playlistId', async (req, res) => {
  try {
  const didLike = await playlist_likes.findAll({
    where: {
      user_id: [req.params.userId],
      playlist_id: [req.params.playlistId]
    }
  })
  res.json(didLike);
} catch (error) {
  res.status(500).send(error);
}
})

router.post('/', async (req, res) => {
  try {
  const newlike = await playlist_likes.create(req.body);
  res.json(newlike);
} catch (error) {
  res.status(500).send(error);
}
})


router.patch('/:userId', async (req, res) => {
  try {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById);
} catch (error) {
  res.status(500).send(error);
}
})

router.delete('/:userId/:playlistId', async (req, res) => {
  try {
  await playlist_likes.destroy({
    where: {
      playlist_id: [req.params.playlistId],
      user_id: [req.params.userId],
    }});
  res.json({ deleted: true });
} catch (error) {
  res.status(500).send(error);
}
})

module.exports = router;