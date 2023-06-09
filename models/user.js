const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const { Unauthorized } = require('../errors/MyError');

const {
  emailIncorrect,
  unauthorized,
} = require('../errors/messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: `${emailIncorrect}: {VALUE}`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  toJSON: { useProjection: true },
  toObject: { useProjection: true },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .orFail(new Unauthorized(unauthorized))
    .select('+password')
    .then((user) => (
      bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Unauthorized(unauthorized));
          }
          return user;
        })
    ));
};

module.exports = mongoose.model('user', userSchema);
