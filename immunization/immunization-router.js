const express = require('express');

const Immunization = require("./immunization-model");
const Children = require('../child/child-model');

const router = express.Router();

// **********************************************************************

// CRUD Endpoints

// GET /api/immunization endpoint to Retrieve immunization - FUNCTIONAL
router.get('/', (req, res) => {
  Immunization.find()
    .then(immunization => {
      res.status(200).json(immunization);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Failed to get immunization" });
    });
});

// GET /api/immunization/:id endpoint to Retrieve immunization by ID - FUNCTIONAL
router.get('/:id', (req, res) => {
  // console.log(req.params.id);
  Immunization.findById(req.params.id)
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

// PUT /api/immunization/:id endpoint to Update a immunization

router.put("/:id", async (req, res) => {
  try {
    const trip = await Immunization.update(req.params.id, req.body);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: "Uh-oh! immunization could not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Bummer. Error updating the immunization" });
  }
});

// DELETE /api/immunization/:id endpoint to Delete a immunization - FUNCTIONAL
router.delete('/:id', (req, res) => {
  Immunization.remove(req.params.id)
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

// GET /api/immunization/:id/children endpoint to Retrieve children by immunization - FUNCTIONAL
router.get('/:id/children', (req, res) => {
  Immunization.findChildren(req.params.id)
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
      res.status(500).json({ message: "Failed to get children" });
    });
});

// POST /api/immunization/:id/children to Add child by immunization - FUNCTIONAL
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
