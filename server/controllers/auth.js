const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');
const encryption = require('../util/encryption');

function validateUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      message: 'Validation failed, entered data is incorrect',
      errors: errors.array()
    });
    return false;
  }

  return true;
}

module.exports = {
  register: (req, res, next) => {

    if (validateUser(req, res)) {
      const {  username, firstName, lastName, password, email, avatar } = req.body;
      const salt = encryption.generateSalt();
      const hashedPassword = encryption.generateHashedPassword(salt, password);
      User.create({
        username,
        firstName,
        lastName,
        avatar,
        email,
        hashedPassword,
        salt,
        roles: ['User']
      }).then((user) => {
        res.status(201)
          .json({ message: 'User created!', userId: user._id, username: user.username });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      });
    }
  },
  login: (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username })
      .then((user) => {
        if (!user) {
          const error = new Error('A user with this username could not be found');
          error.statusCode = 401;
          throw error;
        }

        if(!user.authenticate(password)) {
          const error = new Error('A user with this email could not be found');
          error.statusCode = 401;
          throw error;
        }

        const token = jwt.sign({ 
          username: user.username,
          userId: user._id.toString()
        }
        , 'AzObi4amma4ibOzA'
        , { expiresIn: '1h' });

         res.status(200).json(
           { 
             message: 'User successfully logged in!', 
             token, 
             userId: user._id.toString(),
             username: user.username
           });
      })
      .catch(error => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }

        next(error);
      })
  }
};