const { Router } = require('express');
const { album_likes } = require('../models');
const router = Router();

router.get('/:userId/:albumId', async (req, res) => {
  const didLike = await album_likes.findAll({
    where: {
      user_id: [req.params.userId],
      album_id: [req.params.albumId]
    }
  })
  res.json(didLike);
})

router.post('/', async (req, res) => {
  const newlike = await album_likes.create(req.body);
  res.json(newlike)
})


router.patch('/:userId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById)
})

router.delete('/:userId/:albumId', async (req, res) => {
  await album_likes.destroy({
    where: {
      album_id: [req.params.albumId],
      user_id: [req.params.userId],
    }});
  res.json({ deleted: true })
})

module.exports = router;