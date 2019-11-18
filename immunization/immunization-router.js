const express = require('express');

const Communities = require('./immunization-model');
const Children = require('../child/child-model');

const router = express.Router();

// **********************************************************************

// CRUD Endpoints

// GET /api/communities endpoint to Retrieve immunization - FUNCTIONAL
router.get('/', (req, res) => {
  Communities.find()
    .then(immunization => {
      res.status(200).json(immunization);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get immunization" });
    });
});

// GET /api/communities/:id endpoint to Retrieve immunization by ID - FUNCTIONAL
router.get('/:id', (req, res) => {
  // console.log(req.params.id);
  Communities.findById(req.params.id)
    .then(community => {
      if (community) {
        res.status(200).json(community);
      } else {
        res
          .status(404)
          .json({ message: "Could not find immunization with given ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get immunization", err });
    });
});

// PUT /api/communities/:id endpoint to Update a immunization- NOT ESSENTIAL

// DELETE /api/communities/:id endpoint to Delete a immunization - FUNCTIONAL
router.delete('/:id', (req, res) => {
  Communities.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: "The immunization has ben deleted" });
      } else {
        res.status(404).json({ message: "Invalid immunization ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error deleting the immunization" });
    });
});

// GET /api/communities/:id/children endpoint to Retrieve children by immunization - FUNCTIONAL
router.get('/:id/children', (req, res) => {
  Communities.findChildren(req.params.id)
    .then(children => {
      if (children.length) {
        res.status(200).json(children);
      } else {
        res.status(404).json({
          message: "Could not find find children for given immunization"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get children' });
    });
});

// POST /api/communities/:id/children to Add child by immunization - FUNCTIONAL
router.post('/:id/children', (req, res) => {
  const child = req.body;
  child.immunization_id = req.params.id;
  console.log(child);

  if (
    child.name &&
    child.parent_name &&
    child.contact &&
    child.gender &&
    child.DOB &&
    child.provider_id
  ) {
    Children.add(child)
      .then(saved => {
        res.status(201).json({ added: saved });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error adding new child' });
      });
  } else {
    res.status(400).json({ message: 'Please provide child information' });
  }
});

// **********************************************************************

module.exports = router;
