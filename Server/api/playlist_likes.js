const { Router } = require('express');
const { playlist_likes } = require('../models');
const router = Router();

router.get('/:userId/:playlistId', async (req, res) => {
  const didLike = await playlist_likes.findAll({
    where: {
      user_id: [req.params.userId],
      playlist_id: [req.params.playlistId]
    }
  })
  res.json(didLike);
})

router.post('/', async (req, res) => {
  const newlike = await playlist_likes.create(req.body);
  res.json(newlike)
})


router.patch('/:userId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById)
})

router.delete('/:userId/:playlistId', async (req, res) => {
  await playlist_likes.destroy({
    where: {
      playlist_id: [req.params.playlistId],
      user_id: [req.params.userId],
    }});
  res.json({ deleted: true })
})

module.exports = router;