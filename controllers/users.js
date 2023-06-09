const { BadRequest, NotFound, Conflict } = require('../errors/MyError');

const {
  updateProfile,
  userNotFound,
  conflict,
} = require('../errors/messages');
const User = require('../models/user');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(userNotFound))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err.name === 'CastError' ? new BadRequest(userNotFound) : err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound(userNotFound))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest(updateProfile));
      } else if (err.code === 11000) {
        next(new Conflict(conflict));
      } else {
        next(err);
      }
    });
};

module.exports.signout = (_, res) => {
  res.clearCookie('jwt').end();
};
