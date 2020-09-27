const { Router } = require('express');
const { artist_likes } = require('../models');
const router = Router();



router.get('/:artistId/list-of-songs', async (req, res) => {
  const song = await Song.findAll({
    attributes:[['song_name', 'name'], 'id', 'length'],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where: {
      artistId: [req.params.artistId]
    }
  });
  console.log(song);
  res.json(song);
})

router.get('/:artistId/list-of-albums', async (req, res) => {
  const relatedAlbums = await Album.findAll({
    attributes:[ 'id', 'cover_img'],
    include: [{model:Artist, attributes:[['artist_name', 'name']]}],
    where: {'artistId':{[Op.eq]: req.params.artistId}}
  });
  console.log(relatedAlbums);
  res.json(relatedAlbums);
})

router.get('/:artistId', async (req, res) => {
  const artistById = await Artist.findAll({
    attributes:[['artist_name','name'], 'cover_img', ['createdAt', 'created_at']],
    where:{'id':{[Op.eq]: req.params.artistId}}
  });
  res.json(artistById)
})

router.post('/', async (req, res) => {
  const newlike = await artist_likes.create(req.body);
  res.json(newlike)
})


router.patch('/:artistId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.update(req.body);
  res.json(artistById)
})

router.delete('/:artistId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  await artistById.destroy();
  res.json({ deleted: true })
})

module.exports = router;