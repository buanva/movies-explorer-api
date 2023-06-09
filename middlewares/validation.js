const { celebrate, Joi } = require('celebrate');

const defaultUser = {
  name: 'Жак-Ив Кусто',
};
const { urlRegex } = require('../utils/helpers');

// eslint-disable-next-line import/no-extraneous-dependencies
Joi.objectId = require('joi-objectid')(Joi);

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line newline-per-chained-call
    name: Joi.string().required().min(2).max(30).default(defaultUser.name),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailerLink: Joi.string().required().regex(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().regex(urlRegex),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.objectId(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line newline-per-chained-call
    name: Joi.string().required().min(2).max(30).default(defaultUser.name),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
