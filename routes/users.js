const express = require('express');
const {
  getCurrentUser,
  updateUserProfile,
  signout,
} = require('../controllers/users');
const {
  validateUpdateProfile,
} = require('../middlewares/validation');

const router = express.Router();

router.get('/users/me', getCurrentUser);

router.patch('/users/me', validateUpdateProfile, updateUserProfile);

router.post('/signout', signout);

module.exports = router;
