const jwt = require('jsonwebtoken');

function isNotAuthenticated(req, next) {
  req.isAuthenticated = false;
  return next();
}

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) return isNotAuthenticated(req, next);

  // Authentication Header = Bearer 'token'
  const token = authHeader.split(' ')[1];
  if (!token || token === '') return isNotAuthenticated(req, next);

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret-key');
  } catch (error) {
    return isNotAuthenticated(req, next);
  }

  if (!decodedToken) return isNotAuthenticated(req, next);

  req.isAuthenticated = true;
  req.userId = decodedToken.userId;
  return next();
};
