const express = require('express');

const Provider = require("./provider-model");
const Immunization = require("../immunization/immunization-model");

const restricted = require('../auth/restricted-middleware');

const router = express.Router();

// **********************************************************************

// CRUD Endpoints

// GET /api/provider endpoint to Retrieve providers - FUNCTIONAL
router.get('/', (req, res) => {
   Provider.find()
     .then(provider => {
       res.status(200).json(provider);
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ message: "Failed to get provider" });
     });
});

// GET /api/provider/:id endpoint to Retrieve provider by ID - FUNCTIONAL
router.get('/:id',  (req, res) => {
   Provider.findById(req.params.id)
     .then(country => {
       if (country) {
         res.status(200).json(country);
       } else {
         res
           .status(404)
           .json({ message: "Could not find country with given ID" });
       }
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ message: "Failed to get country" });
     });
});

// POST /api/provider endpoint to Create a new provider - FUNCTIONAL
router.post('/',(req, res) => {
  const name = req.body;

  if (name.name) {
    Provider.add(name)
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

// PUT /api/provider/:id endpoint to Update a provider- NOT ESSENTIAL

// DELETE /api/provider/:id endpoint to Delete a provider - FUNCTIONAL
router.delete('/:id',  (req, res) => {
   Provider.remove(req.params.id)
     .then(count => {
       if (count) {
         res.status(200).json({ message: "The country has been deleted" });
       } else {
         res.status(404).json({ message: "Invalid country ID" });
       }
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ message: "Error deleting the country" });
     });
});

// GET /api/provider/:id/immunization to Retrieve immunization by provider- FUNCTIONAL
router.get('/:id/communities', (req, res) => {
   Provider.findCommunities(req.params.id)
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
       res.status(500).json({ message: "Failed to get immunization" });
     });
});

// POST /api/countries/:id/immunization to Create a new immunization by provider - FUNCTIONAL
router.post("/:id/immunization", (req, res) => {
  const name = req.body;
  name.provider_id = req.params.id;
  // console.log(name);

  if (name.name) {
    Immunization.add(name)
      .then(saved => {
        res.status(201).json({ added: saved });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error adding new immunization" });
      });
  } else {
    res.status(400).json({ message: "Please provide immunization name" });
  }
});

// **********************************************************************

module.exports = router;
