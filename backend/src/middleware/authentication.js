const jwt = require('jsonwebtoken');

function isNotAuthenticated(req, next) {
  req.isAuthenticated = false;
  return next();
}

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log('authHeader ', authHeader);
  if (!authHeader) return isNotAuthenticated(req, next);

  // Authentication Header = Bearer 'token'
  const token = authHeader.split(' ')[1];
  console.log('token ', token);
  if (!token || token === '') return isNotAuthenticated(req, next);

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'secret-key');
  } catch (error) {
    return isNotAuthenticated(req, next);
  }
  console.log('decodedToken ', decodedToken);

  if (!decodedToken) return isNotAuthenticated(req, next);

  req.isAuthenticated = true;
  req.userId = decodedToken.userId;
  console.log('is authenticated ', req.isAuthenticated);
  return next();
};
