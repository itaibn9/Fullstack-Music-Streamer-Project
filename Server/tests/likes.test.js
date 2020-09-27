const request = require('supertest');
const app = require('../app');
const { song_likes } = require('../models');

const songMock = [
{
    user_id: 1,
    song_id: 1
  },{
    user_id: 1,
    song_id: 2
  },{
    user_id: 2,
    song_id: 1
  }];

  describe('Can add and delete likes and get the number of like per song', () => {
    afterAll(async () => {
        await song_likes.destroy({ truncate: true, force: true });
      });

    it('can add likes to the database and get them all', async () =>{
         await request(app).post('/api/song_likes/').send(songMock[0]);
         await request(app).post('/api/song_likes/').send(songMock[1]);
         await request(app).post('/api/song_likes/').send(songMock[2]);
         const { body } = await request(app).get('/api/song_likes');
         expect(body.length).toBe(3);
    })
    it('can count numbers of like per song id', async () =>{
        const { body } = await request(app).get('/api/song/1/count-likes');
        expect(body[0].countLikes).toBe(2);
    })
    it('can delete a like (if the user decided to dislike)', async () =>{
        await request(app).delete('/api/song_likes/1/2');
        const { body } = await request(app).get('/api/song_likes');
        expect(body.length).toBe(2);
    })
  })

  