const express = require('express');
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/movies', getAllMovies);

router.post('/movies', validateCreateMovie, createMovie);

router.delete('/movies/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
