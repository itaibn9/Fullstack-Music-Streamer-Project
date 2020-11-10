const { Router } = require('express');
let jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
        password
      }
    });
    if(!user) {
      return res.status(500).json({
        errorMessage: 'wrong login details'
      })
    }
    let token = jwt.sign({email: email},
      process.env.JWT_SECRET,
      {
           expiresIn: '24h' // expires in 24 hours
      }
    );
    return res.json({
      success: true,
      token,
      name: user.name
    });
  });




module.exports = router;