const express = require('express');
const app =express();
const router = express.Router();
const connection = require('../connection')
const topLimit = 10;
app.use(express.json());

router.get('/:id', async (req, res) => {
    const query = `SELECT song_name, lyric,youtube_link, DATE( upload_at ) ,length, artist.artist_name,
    COUNT(likes_song_interaction.song_id) AS likes FROM song JOIN artist ON song.artist_id=artist.artist_id JOIN likes_song_interaction ON song.song_id=likes_song_interaction.song_id  WHERE song.song_id=${req.params.id};`
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
    });
});

router.put('/:id', async (req, res) => {
    const query = newQuery('putById', 'song', req.body, req.params.id)
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.status(200).json({message:"successfully updated"});
      });
});

router.post('/', async (req, res) =>{
    const query = newQuery("post", "song", req.body)
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.status(200).json({message:"successfully added"});
      });
});

router.delete('/:id', async (req, res) => {
    const query = newQuery('deleteById', 'song','', req.params.id)
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.status(200).json({message:"successfully deleted"});
      });
});

module.exports = router;