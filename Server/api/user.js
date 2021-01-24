const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User } = require('../models');
const { Op } = require("sequelize");
const router = Router();

router.post('/register', async (req, res) => {
  try { 
    if(!req.body.email || !req.body.name || !req.body.password) {
      res.status(403).send("Fill properly")
    }
    const userCheck = await User.findOne({
      where:{'email':{[Op.eq]: req.body.email}}
    });
    console.log(userCheck);
    if(userCheck) return res.status(409).send("user already exists");
    req.body.password = await hashingFunc(req.body.password);
    const user = {email: req.body.email , name: req.body.name, password: req.body.password};
    await User.create(user);
    res.status(201).send("Register success");
} catch (error) {
    res.status(403).send(error);
}
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDetails = await User.findOne({
    where:{'email':{[Op.eq]: email}}
  });
  if(userDetails == null) {
    return res.status(404).send("cannot find user")
}
try {
  if(!await bcrypt.compare(password, userDetails.password)){
      res.status(403).send("User or Password incorrect"); 
  }      
    const accessToken = await generateAccessToken({email: email});
    res.send({
      success: true,
      accessToken,
      name: userDetails.name
    });   
} catch (error) {
  return res.status(404).json({
    errorMessage: 'wrong login details'
  })
}
  });


const hashingFunc = async (password) => { 
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
}

async function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "24h"});
}

// router.get('/top/', async (req, res) => {
//   const allArtists = await Artist.findAll({
//     attributes: ['id', ['artist_name', 'name'], 'cover_img'],
//     order: ['likes'],
//     limit: topLimit
//   });
//   res.json(allArtists)
// })

// router.get('/:artistId/list-of-songs', async (req, res) => {
//   const song = await Song.findAll({
//     attributes:[['song_name', 'name'], 'id', 'length'],
//     include: [{model:Artist, attributes: [['artist_name', 'name']]}],
//     where: {
//       artistId: [req.params.artistId]
//     }
//   });
//   console.log(song);
//   res.json(song);
// })

// router.get('/:artistId/list-of-albums', async (req, res) => {
//   const relatedAlbums = await Album.findAll({
//     attributes:[ 'id', 'cover_img'],
//     include: [{model:Artist, attributes:[['artist_name', 'name']]}],
//     where: {'artistId':{[Op.eq]: req.params.artistId}}
//   });
//   console.log(relatedAlbums);
//   res.json(relatedAlbums);
// })

// router.get('/:artistId', async (req, res) => {
//   const artistById = await Artist.findAll({
//     attributes:[['artist_name','name'], 'cover_img', ['createdAt', 'created_at']],
//     where:{'id':{[Op.eq]: req.params.artistId}}
//   });
//   res.json(artistById)
// })
// router.patch('/:artistId', async (req, res) => {
//   const artistById = await Artist.findByPk(req.params.artistId);
//   await artistById.update(req.body);
//   res.json(artistById)
// })

// router.delete('/:artistId', async (req, res) => {
//   const artistById = await Artist.findByPk(req.params.artistId);
//   await artistById.destroy();
//   res.json({ deleted: true })
// })

module.exports = router;