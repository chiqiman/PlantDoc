const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  let bearerToken = req.headers.authorization;
  let token;

  try {
    // eslint-disable-next-line quotes
    token = bearerToken.split(" ")[1];
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }

  if (!token) {
    return res.status(403).send({ message: 'No Token Provided' });
  }

  jwt.verify(token, 'the-super-strong-secret', (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: err.message });
    }
    req.user = decoded.id;
    console.log(decoded);
    next();
  });
};

module.exports = verifyToken;
