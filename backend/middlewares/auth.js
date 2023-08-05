const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../utils/link');
const UnauthorizedError = require('../errors/UnauthorizedError');

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
    // throw new UnauthorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Неверно указаны почта или пароль'));
    // throw new UnauthorizedError('Неверно указаны почта или пароль');
  }

  req.user = payload;
  next();
};

module.exports = authMiddleware;
