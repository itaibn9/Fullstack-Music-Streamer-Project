const { Router } = require('express');
const checkToken = require('../middleware/authentication');
const router = Router();

router.use('/song', require('./song'));
router.use('/album', checkToken, require('./album'));
router.use('/artist', checkToken, require('./artist'));
router.use('/playlist', require('./playlist'));
router.use('/user', require('./user'));
router.use('/artist_likes', checkToken, require('./artist_likes'));
router.use('/album_likes', checkToken, require('./album_likes'));
router.use('/song_likes', checkToken, require('./song_likes'));
router.use('/playlist_likes', checkToken, require('./playlist_likes'));
router.use('/playlistSongInteraction', checkToken, require('./song_playlist_interaction'));

module.exports = router;


