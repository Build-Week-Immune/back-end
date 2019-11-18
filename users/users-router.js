const express = require('express');

const Users = require('./users-model');

const router = express.Router();

// GET /api/users Endpoint
router.get('/', (req, res) => {
  const { subject, username, role } = req.decodedToken;

  if (role === 'admin') {
    Users.find()
      .then(users => {
        res.json({ loggedInUser: username, users });
      })
      .catch(err => res.status(500).send(err));
  } else {
    Users.findById(subject)
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(500).send(err));
  }
});

module.exports = router;
