// const express = require('express');
// const router = express.Router();
// const connection = require('../connection')
// const newQuery = require('./querySelector');

// router.get('/:id', async (req, res) => {
//     const query = `CALL GetAlbumDetails(${req.params.id});`
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.send(results);
//     });
// });

// router.get('/:id/list-of-songs', async (req, res) => {
//     const query = `CALL GetAlbumSongList(${req.params.id});`
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.send(results);
//     });
// });

// router.put('/:id', async (req, res) => {
//     const query = newQuery('putById', 'album', req.body, req.params.id)
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.status(200).json({message:"successfully updated"});
//       });
// });

// router.post('/', async (req, res) =>{
//     const query = newQuery("post", "album", req.body)
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.status(200).json({message:"successfully added"});
//       });
// });

// router.delete('/:id', async (req, res) => {
//     const query = newQuery('deleteById', 'album','', req.params.id)
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.status(200).json({message:"successfully deleted"});
//       });
// });

// module.exports = router;

const { Router } = require('express');
const { Album } = require('../models');

const router = Router();

router.get('/top/', async (req, res) => {
  const allAlbums = await Album.findAll({
    // include: ['Songs','Artist']
  });
  res.json(allAlbums)
});

router.post('/', async (req, res) => {
  const newAlbum = await Album.create(req.body);
  res.json(newAlbum)
})

router.get('/:albumId', async (req, res) => {
  const album = await Album.findByPk(req.params.albumId);
  res.json(album)
})

router.patch('/:albumId', async (req, res) => {
  const album = await Album.findByPk(req.params.albumId);
  await album.update(req.body);
  res.json(album)
})

router.delete('/:albumId', async (req, res) => {
  const album = await Album.findByPk(req.params.albumId);
  await album.destroy();
  res.json({ deleted: true })
})



module.exports = router;
