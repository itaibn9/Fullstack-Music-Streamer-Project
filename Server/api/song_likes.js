const { Router } = require('express');
const { song_likes } = require('../models');
const router = Router();


router.post('/', async (req, res) => {
  const newlike = await song_likes.create(req.body);
  res.json(newlike)
})


router.patch('/:userId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById)
})

router.delete('/:userId/:artistId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.destroy();
  res.json({ deleted: true })
})

module.exports = router;