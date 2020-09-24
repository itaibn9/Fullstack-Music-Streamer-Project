// const express = require('express');
// const router = express.Router();
// const connection = require('../connection')
// const newQuery = require('./querySelector');

// router.get('/:id', async (req, res) => {
//     const query = `CALL GetPlaylistDetails(${req.params.id});`
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.send(results);
//     });
// });

// router.get('/:id/list-of-songs', async (req, res) => {
//     const query = `CALL GetSongList(${req.params.id});`
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.send(results);
//     });
// });



// router.put('/:id', async (req, res) => {
//     const query = newQuery('putById', 'playlist', req.body, req.params.id)
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.status(200).json({message:"successfully updated"});
//       });
// });

// router.post('/', async (req, res) =>{
//     const query = newQuery("post", "playlist", req.body)
//     connection.query(query, (error, results, fields) => {
//         if (error) {
//             res.send(error.message);
//             throw error;
//         };
//         res.status(200).json({message:"successfully added"});
//       });
// });

// router.delete('/:id', async (req, res) => {
//     const query = newQuery('deleteById', 'playlist','', req.params.id)
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
const { Playlist } = require('../models');

const router = Router();

router.get('/top/', async (req, res) => {
  const allPlaylists = await Playlist.findAll();
  res.json(allPlaylists)
})

router.post('/', async (req, res) => {
  const newPlaylist = await Playlist.create(req.body);
  res.json(newPlaylist)
})

router.get('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  res.json(playlist)
})

router.patch('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  await playlist.update(req.body);
  res.json(playlist)
})

router.delete('/:playlistId', async (req, res) => {
  const playlist = await Playlist.findByPk(req.params.playlistId);
  await playlist.destroy();
  res.json({ deleted: true })
})

module.exports = router;