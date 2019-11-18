const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model');

const router = express();

// POST /api/auth/register Endpoint - FUNCTIONAL
router.post('/register', (req, res) => {
  const user = req.body;

  if (user.username && user.password) {
    const hash = bcrypt.hashSync(user.password, 12);

    user.password = hash;

    Users.add(user)
      .then(saved => {
        const token = generateToken(user);
        res.status(201).json({ user: saved, token });
      })
      .catch(err => {
        res.status(500).json(err);
      });
  } else {
    res
      .status(400)
      .json({ message: 'Please provide registration information' });
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
            country_id: user.country_id,
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
    country_id: user.country_id,
    role: user.role,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
