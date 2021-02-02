const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = 'secret-key'

const PATH_WHITELIST = ['/login', '/logout'];

module.exports = (req, res, next) => {
  if (PATH_WHITELIST.includes(req.path)) return next();

  const token = req.cookies.token;

  if (token !== undefined) {
    try {
      res = jwt.verify(token, JWT_SECRET_KEY, {
        expiresIn: '30min'
      });
    } catch {
      res.render('401error');
    }

    return next();
  } else {
    res.render('401error');
  }
};
