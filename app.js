require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const handleError = require('./middlewares/handleError');
const corsOptionsDelegate = require('./middlewares/cors');
const { limiter } = require('./middlewares/rateLimit');
const routes = require('./routes/index');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB_URL);

const app = express();

app.use(
  cors(corsOptionsDelegate),
  bodyParser.json(),
  cookieParser(),
  requestLogger,
  helmet(),
  limiter,
);

app.use('/', routes);

app.use(errorLogger, errors(), handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
