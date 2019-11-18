const express = require('express');

const Countries = require('./provider-model');
const Communities = require('../immunization/immunization-model');

const restricted = require('../auth/restricted-middleware');

const router = express.Router();

// **********************************************************************

// CRUD Endpoints

// GET /api/countries endpoint to Retrieve countries - FUNCTIONAL
router.get('/', (req, res) => {
  Countries.find()
    .then(provider => {
      res.status(200).json(provider);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get provider" });
    });
});

// GET /api/countries/:id endpoint to Retrieve country by ID - FUNCTIONAL
router.get('/:id',  (req, res) => {
  Countries.findById(req.params.id)
    .then(country => {
      if (country) {
        res.status(200).json(country);
      } else {
        res
          .status(404)
          .json({ message: 'Could not find country with given ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get country' });
    });
});

// POST /api/countries endpoint to Create a new country - FUNCTIONAL
router.post('/',(req, res) => {
  const name = req.body;

  if (name.name) {
    Countries.add(name)
      .then(saved => {
        res.status(201).json({ added: saved });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error adding new provider" });
      });
  } else {
    res.status(400).json({ message: "Please provide provider name" });
  }
});

// PUT /api/countries/:id endpoint to Update a provider- NOT ESSENTIAL

// DELETE /api/countries/:id endpoint to Delete a provider - FUNCTIONAL
router.delete('/:id',  (req, res) => {
  Countries.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The country has been deleted' });
      } else {
        res.status(404).json({ message: 'Invalid country ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the country' });
    });
});

// GET /api/countries/:id/communities to Retrieve immunization by provider- FUNCTIONAL
router.get('/:id/communities', (req, res) => {
  Countries.findCommunities(req.params.id)
    .then(immunization => {
      if (immunization.length) {
        res.status(200).json(immunization);
      } else {
        res.status(404).json({
          message: "Could not find find immunization for given provider"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get communities" });
    });
});

// POST /api/countries/:id/communities to Create a new immunization by provider - FUNCTIONAL
router.post('/:id/communities',  (req, res) => {
  const name = req.body;
  name.provider_id = req.params.id;
  // console.log(community);

  if (name.name) {
    Communities.add(name)
      .then(saved => {
        res.status(201).json({ added: saved });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error adding new community' });
      });
  } else {
    res.status(400).json({ message: 'Please provide community name' });
  }
});

// **********************************************************************

module.exports = router;
