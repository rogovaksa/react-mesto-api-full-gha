const dotenv = require('dotenv');

dotenv.config();

const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  DB_ADDRESS,
  URL_REGEX,
};
