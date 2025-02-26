const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const validateToken = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY); 
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token.' });
  }
});

module.exports = validateToken;
