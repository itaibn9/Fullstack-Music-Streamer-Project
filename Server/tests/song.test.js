const request = require('supertest');
const app = require('../app');
const { Song } = require('../models');

const songMock = {
  song_name: 'new song name',
  albumId:'2',
  artistId:'2',
  lyric:'bla bla bla',
  youtubeLink:'www.youtube.com/123',
  length:'140',
  likes:'2',
  cover_img:'www.photoURL.com'
}

describe('api v1', () => {

  beforeEach(async () => {
    await Song.destroy({ truncate: true, force: true });
  });

  it('Can get create new song', async () => {
    const { body } = await request(app).post('/api/song/').send(songMock);
    console.log('aaa', body);
  });

})