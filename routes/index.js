const express = require('express');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

const { NotFound } = require('../errors/MyError');
const { pageNotFound } = require('../errors/messages');

const {
  validateLogin,
  validateCreateUser,
} = require('../middlewares/validation');

const { createUser, login } = require('../controllers/auth');
const auth = require('../middlewares/auth');

const router = express.Router();
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use('/', usersRouter, moviesRouter);
router.use((_, res, next) => {
  next(new NotFound(pageNotFound));
});

module.exports = router;
