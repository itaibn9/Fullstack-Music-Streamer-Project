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

// GET REQUEST FOR TOP Limit
app.get('/top/:table',(req, res) => {
    const query = `SELECT ${req.params.table}_id AS id, ${req.params.table}_name, cover_img FROM ${req.params.table} ORDER BY likes LIMIT ${topLimit};`
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
// GET REQUEST FOR Search
app.get('/search/:table/:searchInput',(req, res) => {
    const query = `SELECT ${req.params.table}_id AS id, ${req.params.table}_name, cover_img FROM ${req.params.table}
     WHERE ${req.params.table}_name LIKE "%${req.params.searchInput}%" ORDER BY likes LIMIT ${topLimit};`
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

