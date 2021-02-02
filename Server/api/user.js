const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const { Router } = require('express');
const { User, RefreshToken } = require('../models');
const { Op } = require("sequelize");
const checkToken = require('../middleware/authentication');
const router = Router();

router.get(
  '/validateToken',
  checkToken,
  (req, res) => {
    res.send(true);
  }
);

router.post('/register', async (req, res) => {
  try { 
    const { body: userRegisterationData } = req;

    if(!userRegisterationData.email || !userRegisterationData.name || !userRegisterationData.password) {
      res.status(403).send("Fill properly")
    }
    const userCheck = await User.findOne({
      where:{'email':{[Op.eq]: userRegisterationData.email}}
    });
    if(userCheck) return res.status(409).send("user already exists");
    userRegisterationData.password = await hashingFunc(userRegisterationData.password);
    const user = { name: userRegisterationData.name, password: userRegisterationData.password, email: userRegisterationData.email };
    await User.create(user);
    res.status(201).send("Register success");
} catch (error) {
    res.status(403).send(error);
}
})

router.post('/login', async (req, res) => {
  try {
  const loginData = req.body;
  const userDetails = await User.findOne({
    where:{'email':{[Op.eq]: loginData.email}}
  });
  if(userDetails == null) {
    return res.status(404).send("cannot find user")
}
await bcrypt.compare(
  loginData.password,
  userDetails.password,
  (err, result) => {
    if (err) {
      res.status(403).send(err);
    } else if (!result) {
      res.status(403).send('User or Password incorrect');
    }
  }
);

const expiresIn = loginData.rememberMe ? '365 days' : '24h';
const infoForCookie = {
  userId: userDetails.id,
  email: userDetails.email
};

// assigning new refresh token
const refreshToken = jwt.sign(
  infoForCookie,
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn }
);

// checking if the user already have a token, and if does updates it.
const userToken = await RefreshToken.findOne({
    where: { userId: userDetails.id }
  });
  if(userToken) {
    await RefreshToken.update({
      token: refreshToken
    }, {
      where: { userId: userDetails.id }
    })
  } else {
    const newRefreshToken = {
      userId: userDetails.id,
      token: refreshToken
    };
    await RefreshToken.create(newRefreshToken);
  }

    const accessToken = await generateAccessToken({ email: loginData.email });
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    res.cookie('email', userDetails.email);
    res.cookie('id', userDetails.id);
    res.cookie('name', userDetails.name);
    res.status(200).send({
      accessToken,
      email: userDetails.email,
      id: userDetails.id,
      name: userDetails.name,
    });   
} catch (error) {
  return res.status(403).send(error)
}
  });


const hashingFunc = async (password) => { 
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
}

async function generateAccessToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {expiresIn: "24h"});
}

router.post('/token', async (req, res) => {
  const refreshToken = req.body.token;
  const validRefreshToken = await RefreshToken.findOne({
    where:{'token':{[Op.eq]: refreshToken}}
  });
  if (!validRefreshToken) {
    return res.status(403).json({ message: 'Invalid Refresh Token' });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) { return res.status(403).json({ message: 'Invalid Refresh Token' }); }
      delete decoded.iat;
      delete decoded.exp;
      const updatedAccessToken = generateAccessToken(decoded);
      res.cookie('accessToken', updatedAccessToken);
      res.json({ message: 'token updated' });
    }
  );
});
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