const { Router } = require('express');
const { album_likes } = require('../models');
const router = Router();

router.get('/:userId/:albumId', async (req, res) => {
  try {
  const didLike = await album_likes.findAll({
    where: {
      user_id: [req.params.userId],
      album_id: [req.params.albumId]
    }
  })
  res.json(didLike);
} catch (error) {
  res.status(500).send(error);
}
})

router.post('/', async (req, res) => {
  try {
  const newlike = await album_likes.create(req.body);
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

router.delete('/:userId/:albumId', async (req, res) => {
  try {
  await album_likes.destroy({
    where: {
      album_id: [req.params.albumId],
      user_id: [req.params.userId],
    }});
  res.json({ deleted: true });
} catch (error) {
  res.status(500).send(error);
}
})

module.exports = router;