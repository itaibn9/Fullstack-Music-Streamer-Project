let jwt = require('jsonwebtoken');

// eslint-disable-next-line import/prefer-default-export
const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Or undefiend or the access token
  if (token == null) return res.status(401).send('Access Token Required');
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(408).send('Invalid Access Token'); // you got a token but this is no longer valid
    }
    req.body.user = decoded;
    next();
  });
};

module.exports = checkToken