const { Router } = require('express');
const router = Router();
// const topLimit = 10;

router.use('/song', require('./song'));
router.use('/album', require('./album'));
router.use('/artist', require('./artist'));
router.use('/playlist', require('./playlist'));
router.use('/user', require('./user'));
router.use('/artist_likes', require('./artist_likes'));
router.use('/album_likes', require('./album_likes'));
router.use('/playlistSongInteraction', require('./song_playlist_interaction'));

module.exports = router;


