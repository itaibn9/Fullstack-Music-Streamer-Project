const express = require('express');
const router = express.Router();
const connection = require('../connection')
const newQuery = require('./querySelector');

router.get('/:id', async (req, res) => {
    const query = newQuery('getById', 'artist','',req.params.id);
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.send(results);
    });
});

router.put('/:id', async (req, res) => {
    const query = newQuery('putById', 'artist', req.body, req.params.id)
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.status(200).json({message:"successfully updated"});
      });
});

router.post('/', async (req, res) =>{
    const query = newQuery("post", "artist", req.body)
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.status(200).json({message:"successfully added"});
      });
});

router.delete('/:id', async (req, res) => {
    const query = newQuery('deleteById', 'artist','', req.params.id)
    connection.query(query, (error, results, fields) => {
        if (error) {
            res.send(error.message);
            throw error;
        };
        res.status(200).json({message:"successfully deleted"});
      });
});

module.exports = router;