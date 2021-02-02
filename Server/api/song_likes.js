const { Router } = require('express');
const { song_likes } = require('../models');
const router = Router();

router.get('/', async (req, res) => {
  try {
  const likes = await song_likes.findAll();
  res.json(likes);
} catch (error) {
  res.status(500).send(error);
}
})

router.get('/:userId/:songId', async (req, res) => {
  try {
  const didLike = await song_likes.findAll({
    where: {
      user_id: [req.params.userId],
      song_id: [req.params.songId]
    }
  })
  res.json(didLike);
} catch (error) {
  res.status(500).send(error);
}
})

router.post('/', async (req, res) => {
  try {
  const newlike = await song_likes.create(req.body);
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

router.delete('/:userId/:songId', async (req, res) => {
  try {
  await song_likes.destroy({
    where: {
      song_id: [req.params.songId],
      user_id: [req.params.userId],
    }});
  res.json({ deleted: true });
} catch (error) {
  res.status(500).send(error);
}
})

module.exports = router;