const express = require('express');
// const rest=require("../auth/restricted-middleware")
const Users = require('./users-model');

const router = express.Router();

// GET /api/users Endpoint
router.get('/', (req, res) => {
  const { subject, username, role } = req.decodedJwt;

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

// GET /api/provider/:id endpoint to Retrieve provider by ID - FUNCTIONAL
router.get('/:id',(req, res) => {
    Users.findById(req.params.id)
      .then(country => {
        if (country) {
          res.status(200).json(country);
        } else {
          res
            .status(404)
            .json({ message: "Could not find user with given ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Failed to get user" });
      });
});

router.put("/:id", async (req, res) => {
  try {
    const trip = await Users.update(req.params.id, req.body);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: "Uh-oh! Users could not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Bummer. Error updating the  Users" });
  }
});

module.exports = router;
