// const express = require('express');
// const router = express.Router();
// const connection = require('../connection')
// const newQuery = require('./querySelector');

// router.get('/:id', async (req, res) => {
//     const query = `CALL GetArtistDetails(${req.params.id});`
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.send(results);
//     });
// });

// router.get('/:id/list-of-songs', async (req, res) => {
//     const query = `CALL getArtistSongList(${req.params.id});`
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.send(results);
//     });
// });

// router.get('/:id/list-of-albums', async (req, res) => {
//     const query = `CALL GetRelatedAlbumsFromArtist(${req.params.id});`
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.send(results);
//     });
// });

// router.put('/:id', async (req, res) => {
//     const query = newQuery('putById', 'artist', req.body, req.params.id)
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.status(200).json({message:"successfully updated"});
//       });
// });

// router.post('/', async (req, res) =>{
//     const query = newQuery("post", "artist", req.body)
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.status(200).json({message:"successfully added"});
//       });
// });

// router.delete('/:id', async (req, res) => {
//     const query = newQuery('deleteById', 'artist','', req.params.id)
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
const { Artist } = require('../models');
const topLimit = 20;
const router = Router();

router.get('/top/', async (req, res) => {
  const allArtists = await Artist.findAll({
    limit: topLimit
  });
  res.json(allArtists)
})

router.post('/', async (req, res) => {
  const newArtist = await Artist.create(req.body);
  res.json(newArtist)
})

router.get('/:artistId', async (req, res) => {
  const artistById = await Artist.findByPk(req.params.artistId);
  res.json(artistById)
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