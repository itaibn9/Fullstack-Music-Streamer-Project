const { Router } = require('express');
const { artist_likes } = require('../models');
const router = Router();

router.get('/:userId/:artistId', async (req, res) => {
  const didLike = await artist_likes.findAll({
    where: {
      user_id: [req.params.userId],
      artist_id: [req.params.artistId]
    }
  })
  res.json(didLike);
})

router.post('/', async (req, res) => {
  const newlike = await artist_likes.create(req.body);
  res.json(newlike)
})


router.patch('/:userId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById)
})

router.delete('/:userId/:artistId', async (req, res) => {
  await artist_likes.destroy({
    where: {
      artist_id: [req.params.artistId],
      user_id: [req.params.userId],
    }});
  res.json({ deleted: true })
})

module.exports = router;