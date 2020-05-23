const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Token is invalid' });
  }
}

module.exports = auth;