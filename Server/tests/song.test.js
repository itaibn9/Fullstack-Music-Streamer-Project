const request = require('supertest');
const app = require('../app');
const { Song, Playlist, Artist, Song_Playlist_interaction } = require('../models');

const songMock = {
  song_name: 'new song name',
  albumId:'2',
  artistId:'1',
  lyric:'bla bla bla',
  youtubeLink:'www.youtube.com/123',
  length: 100,
  likes:'2',
  cover_img:'www.photoURL.com'
};
const playlistMock = {
  playlist_name: 'playlist one',
  description: 'test playlist',
  cover_img: 'test cover_img',
  likes: '100'
};
const playlistIneractionMock = {
  song_id: "1",
  playlist_id: "1"
}
const artistMock = {
  artist_name: "test artist",
  cover_img: "test cover_img",
  description: "test test",
  likes: "100"
};


describe('Can add a song and get his exact details for the top 10 search', () => {

  afterAll(async () => {
    await Song.destroy({ truncate: true, force: true });
  });

  it('Can  create new song', async () => {
    const { body } = await request(app).post('/api/song/').send(songMock);
    console.log('aaa', body);
  });
  it('Can get a song with the relevante details for the top 10 list', async () => {
    const { body } = await request(app).get('/api/song/top');
    expect(body[0]).toStrictEqual({"id":1, "name": songMock.song_name, "cover_img":songMock.cover_img})
  });
})

describe('Has interaction between songs in playlist', () => {
  afterAll(async () => {
    await Song.destroy({ truncate: true, force: true });
    await Playlist.destroy({ truncate: true, force: true });
    await Artist.destroy({ truncate: true, force: true });
    await Song_Playlist_interaction.destroy({ truncate: true, force: true })
  });
  it('Can  create new song', async () => {
    const { body } = await request(app).post('/api/song/').send(songMock);
    console.log('aaa', body);
  });
  it('Can  create new playlist', async () => {
    const { body } = await request(app).post('/api/playlist/').send(playlistMock);
    console.log('aaa', body);
  });
  it('Can  create new interaction', async () => {
    const { body } = await request(app).post('/api/playlistSongInteraction/').send(playlistIneractionMock);
    console.log('aaa', body);
  });
  it('Can  create new artist', async () => {
    const { body } = await request(app).post('/api/artist/').send(artistMock);
    console.log('aaa', body);
  });
  it('Can get a songs in a playlist', async () => {
    const { body } = await request(app).get('/api/playlist/1/list-of-songs');
 
    expect(body[0]).toStrictEqual({
       "name": songMock.song_name,
       "length":songMock.length,
       "id":1,
       "Artist": {
         "artist_name": artistMock.artist_name
       }
      })
  });
})