const { Router } = require('express');
const { Op } = require("sequelize");
const { Song, Sequelize } = require('../models');
const { Artist, song_likes, Album, Playlist } = require('../models');

const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  cloud: {
    id: ":ZWFzdHVzMi5henVyZS5lbGFzdGljLWNsb3VkLmNvbTo5MjQzJDhhYTA3OTBiM2YwNjRmYzk4OWM5ZTEzZDgyY2I3ZDU5JDQ1MTQ0NzlkN2IwMzQ1YzlhMDZhMWIxNzk0MDdkYjg5"
  },
  auth: {
    username: "elastic" ,
    password: "zuHAnkGIoYJbx0JCMmeQNo03"
  }
});

const topLimit = 20;
const router = Router();

router.get("/artists", async (req, res) => {
  try {
    const { body: count1 } = await client.count({ index: "artist" });
    const allPlaylists = await Artist.findAll();
    const body = allPlaylists.flatMap((doc) => [
      { index: { _index: "artist",  _type: "artist" } },
      doc,
    ]);
    const { body: bulkResponse } = await client.bulk({ refresh: true, body });
    console.log(bulkResponse);
    if (bulkResponse.errors) {
      return res.json(bulkResponse.errors);
    }
    const { body: count } = await client.count({ index: "artist" });
    console.log(count);
    res.send(count);
  } catch (e) {
    res.json({ error: e.message });
  }
});


router.get('/top/', async (req, res) => {
  const allSongs = await Song.findAll({
    attributes: ['id', ['song_name', 'name'], 'cover_img'],
    order: ['likes'],
    limit: topLimit
  });
  console.log(allSongs);
  res.json(allSongs);
})



router.get('/:songId/count-likes', async (req, res) => {
  const countLikes = await song_likes.findAll({
    attributes:[[Sequelize.fn("COUNT", Sequelize.col("song_id")), 'countLikes']],
    where:{
      song_id: [req.params.songId]
    }
  });
  console.log(countLikes);
  res.json(countLikes);
})

router.get('/:songId', async (req, res) => {
  const song = await Song.findAll({
    attributes:['song_name', 'lyric','youtubeLink', 'createdAt', 'length','id'],
    include: [{model:Artist, attributes: [['artist_name', 'name']]}],
    where: {
      id: [req.params.songId]
    }
  });
  console.log(song);
  res.json(song);
})

router.get('/search/:searchInput', async (req, res) => {
  const searchResults = await Song.findAll({
    attributes:['id', ['song_name', 'name'], 'cover_img'],
    where: {
     'song_name':{[Op.like]: `%${req.params.searchInput}%`}},
      order: ['likes'],
    limit: topLimit
  });
  console.log(searchResults);
  res.json(searchResults);
})


router.post('/', async (req, res) => {
  const newSong = await Song.create(req.body);
  res.json(newSong)
})


router.patch('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  await song.update(req.body);
  res.json(song)
})

router.delete('/:songId', async (req, res) => {
  const song = await Song.findByPk(req.params.songId);
  await song.destroy();
  res.json({ deleted: true })
})

  // router.get("/all/songs", async (req, res) => {
  //   try {
  //     const { body: count1 } = await client.count({ index: "song" });
  //     console.log(count1);
  //     const allSongs = await Song.findAll();
  //     const body = allSongs.flatMap((doc) => [
  //       { index: { _index: "song",  _type: "song" } },
  //       doc,
  //     ]);
  //     console.log(body);
  //     const { body: bulkResponse } = await client.bulk({ refresh: true, body });
  //     if (bulkResponse.errors) {
  //       return res.json(bulkResponse.errors);
  //     }
  //     const { body: count } = await client.count({ index: "song" });
  //     res.send(count);
  //   } catch (e) {
  //     res.json({ error: e.message });
  //   }
  // });

  
// searchRouter.get("/artist-create", async (req, res) => {
//   try {
//     const { body: count1 } = await client.count({ index: "artist" });
//     const allArtists = await Artist.findAll({
//       include: [
//         {
//           model: Album,
//           attributes: ["name"],
//         },
//       ],
//     });
//     const body = allArtists.flatMap((doc) => [
//         { index: { _index: "artist",  _type: "artist" } },
//         doc,
//       ]);
//     const { body: bulkResponse } = await client.bulk({ refresh: true, body });
//     console.log(bulkResponse);
//     if (bulkResponse.errors) {
//       return res.json(bulkResponse.errors);
//     }
//     const { body: count } = await client.count({ index: "artist" });
//     console.log(count);
//     res.send(count);
//   } catch (e) {
//     res.json({ error: e.message });
//   }
// });
  


module.exports = router;