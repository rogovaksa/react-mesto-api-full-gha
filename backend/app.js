require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const errorsMiddleware = require('./middlewares/errors');
const limiter = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');

const authMiddleware = require('./middlewares/auth');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { MONGODB_URL } = require('./utils/constants');

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);
mongoose.connect(MONGODB_URL);

const app = express();

app.use(cors());

// app.use(express.json());

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use('/', signupRouter);
app.use('/', signinRouter);

app.use(authMiddleware);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((req, res, next) => next(new NotFoundError('Неправильный путь')));

app.use(errorLogger);

app.use(errors());

app.use(errorsMiddleware);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер запущен');
});
