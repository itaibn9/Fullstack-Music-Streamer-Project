const { Router } = require('express');
const { song_likes } = require('../models');
const router = Router();

router.get('/', async (req, res) => {
  const likes = await song_likes.findAll();
  console.log(likes);
  res.json(likes);
})

router.get('/:userId/:songId', async (req, res) => {
  const didLike = await song_likes.findAll({
    where: {
      user_id: [req.params.userId],
      song_id: [req.params.songId]
    }
  })
  res.json(didLike);
})

router.post('/', async (req, res) => {
  const newlike = await song_likes.create(req.body);
  res.json(newlike)
})


router.patch('/:userId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById)
})

router.delete('/:userId/:songId', async (req, res) => {
  await song_likes.destroy({
    where: {
      song_id: [req.params.songId],
      user_id: [req.params.userId],
    }});
  res.json({ deleted: true })
})

module.exports = router;