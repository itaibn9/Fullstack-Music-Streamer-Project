const { Router } = require('express');

const router = Router();

router.use('/songs', require('./song'));
router.use('/albums', require('./album'));
router.use('/artists', require('./artist'));
router.use('/playlist', require('./platlist'));

router.get('/api/top/:table',(req, res) => {
    const query = `SELECT ${req.params.table}_id AS id, ${req.params.table}_name AS name, cover_img FROM ${req.params.table} ORDER BY likes LIMIT ${topLimit};`
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

module.exports = router;