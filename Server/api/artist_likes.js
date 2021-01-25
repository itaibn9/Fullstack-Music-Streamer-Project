const { Router } = require('express');
const { artist_likes } = require('../models');
const router = Router();

router.get('/:userId/:artistId', async (req, res) => {
  try {
  const didLike = await artist_likes.findAll({
    where: {
      user_id: [req.params.userId],
      artist_id: [req.params.artistId]
    }
  })
  res.json(didLike);
} catch (error) {
  res.status(500).send(error);
}
})

router.post('/', async (req, res) => {
  try {
  const newlike = await artist_likes.create(req.body);
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

router.delete('/:userId/:artistId', async (req, res) => {
  try {
  await artist_likes.destroy({
    where: {
      artist_id: [req.params.artistId],
      user_id: [req.params.userId],
    }});
  res.json({ deleted: true });
} catch (error) {
  res.status(500).send(error);
}
})

module.exports = router;