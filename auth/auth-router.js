const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

// const router = express().Router()

// POST /api/auth/register Endpoint - FUNCTIONAL
router.post('/register', (req, res) => {
  let user = req.body;
  const validateResult = validateUser(user);
   if (validateResult.isSuccessful === true) {
  // if (user.username && user.password) {
    const hash = bcrypt.hashSync(user.password, 12);

    user.password = hash;

    Users.add(user)
      .then(saved => {
        // const token = generateToken(user);
        // res.status(201).json({ user: saved, token });
         res.status(201).json(saved);

      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res
      .status(400)
      .json({
        message: "Please provide registration information",
        errors: validateResult.errors
      });
  }
});

// POST /api/auth/login Endpoint - FUNCTIONAL
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome, ${user.username}! You're logged in!`,
            username: user.username,
            role: user.role,
            provider_id: user.provider_id,
            token,
          });
        } else {
          res.status(401).json({ message: 'You shall not pass!' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ message: 'Please provide credentials' });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    provider_id: user.provider_id,
    role: user.role,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

function validateUser(user) {
  let errors = [];

  if (!user.username || user.username.length < 2) {
    errors.push("Please include a username with at least 2 characters");
  }

  if (!user.password || user.password.length < 4) {
    errors.push("Please include a password with at least 4 characters");
  }

  return {
    isSuccessful: errors.length > 0 ? false : true,
    errors
  };
}

module.exports = router;
