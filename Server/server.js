const express = require('express');
const app = express();
require('dotenv').config();
const songRouter = require('./routes/song')
const albumRouter = require('./routes/album')
const playlistRouter = require('./routes/playlist');
const artistRouter = require('./routes/artist');
const connection = require('./connection');
const cors = require('cors');
const topLimit = 10;
app.use(cors());
app.use(express.json());
app.use(logger);

function logger (req, res, next) {
    console.log('request fired ' + req.url + ' ' + req.method);
    next();
}

 app.use('/song', songRouter);
 app.use('/album', albumRouter);
 app.use('/playlist', playlistRouter);
 app.use('/artist', artistRouter);

// ALL GET REQUESTS FOR TOP Limit
app.get('/top_songs/',(req, res) => {
    const query = newQuery('top', 'song',topLimit);
    connection.query(query, (error, results, fields) => {
        if(error){
            console.log(error);
            res.status(500).send({
                error: 'Server is on updating please try later'
              });
        };
        res.send(results);
    });
});

app.get('/top_artists/',(req, res) => {
    const query = newQuery('top', 'artist',topLimit);
    connection.query(query, (error, results, fields) => {
        if(error){
            console.log(error);
            res.status(500).send({
                error: 'Server is on updating please try later'
              });
        };
        res.send(results);
    });
});

app.get('/top_albums/',(req, res) => {
    const query = newQuery('top', 'album',topLimit);
    connection.query(query, (error, results, fields) => {
        if(error){
            console.log(error);
            res.status(500).send({
                error: 'Server is on updating please try later'
              });
        };
        res.send(results);
    });
});

app.get('/top_playlists/',(req, res) => {
    const query = newQuery('top', 'playlist',topLimit);
    connection.query(query, (error, results, fields) => {
        if(error){
            console.log(error);
            res.status(500).send({
                error: 'Server is on updating please try later'
              });
        };
        res.send(results);
    });
});


app.listen(8080, () => {
    console.log('The server runs on port 8080');
})

