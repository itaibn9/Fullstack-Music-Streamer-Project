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
const { playlist } = require('../models');

const router = Router();

router.get('/top/', async (req, res) => {
  const allPlaylists = await playlist.findAll();
  res.json(allPlaylists)
})

module.exports = router;