const { BadRequest, NotFound, Forbidden } = require('../errors/MyError');
const {
  createMovie,
  movieNotFound,
  forbidden,
} = require('../errors/messages');
const Movie = require('../models/movie');

const populates = ['owner'];

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(populates)
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      next(err.name === 'ValidationError' ? new BadRequest(createMovie) : err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFound(movieNotFound))
    .then((movie) => {
      if (movie.owner._id.toString() !== req.user._id) {
        throw new Forbidden(forbidden);
      }
      return Movie.findByIdAndDelete(movie._id).populate(populates);
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err.name === 'CastError' ? new BadRequest(movieNotFound) : err);
    });
};
