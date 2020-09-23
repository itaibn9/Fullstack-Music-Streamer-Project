const { Router } = require('express');
const router = Router();
// const topLimit = 10;

router.use('/song', require('./song'));
router.use('/album', require('./album'));
router.use('/artist', require('./artist'));
router.use('/playlist', require('./playlist'));

module.exports = router;

// router.get('/api/top/:table',(req, res) => {
//     const query = `SELECT ${req.params.table}_id AS id, ${req.params.table}_name AS name, cover_img FROM ${req.params.table} ORDER BY likes LIMIT ${topLimit};`
//     connection.query(query, (error, results, fields) => {
//         if(error){
//             console.log(error);
//             res.status(500).send({
//                 error: 'Server is on updating please try later'
//               });
//         };
//         res.send(results);
//     });
// });

