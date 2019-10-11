const jwt = require('jsonwebtoken');

function isNotAuthenticated() {
    req.isAuthenticated = false;
    return next();
}

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) return isNotAuthenticated();

    // Authentication Header = Bearer 'token'
    const token = authHeader.split(' ')[1];
    if (!token || token === '' ) return isNotAuthenticated();

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret-key');
    } catch (error) {
        return isNotAuthenticated();
    }

    if (!decodedToken) return isNotAuthenticated();

    req.isAuthenticated = true;
    req.userId = decodedToken.userId;
    next();
};