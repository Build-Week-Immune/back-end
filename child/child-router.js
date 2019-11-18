const express = require('express');

const Children = require('./child-model');
const Screenings = require('../screenings/screening-model');

const router = express.Router();

// **********************************************************************

// CRUD Endpoints

// GET /api/children endpoint to Retrieve children - FUNCTIONAL
router.get('/', (req, res) => {
  Children.find()
    .then(children => {
      console.log(children.DOB)
      res.status(200).json(children);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get children' });
    });
});

// GET /api/children/:id endpoint to Retrieve child by ID - FUNCTIONAL
router.get('/:id', (req, res) => {
  // console.log(req.params.id);
  Children.findById(req.params.id)
    .then(child => {
      if (child) {
        res.status(200).json(child);
      } else {
        res.status(404).json({ message: 'Could not find child with given ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get child', err });
    });
});

// PUT /api/children/:id endpoint to Update a child -
// ADD /api/children/ endpoint to Update a child -
router.post("/", (req, res) => {
  const name = req.body;

  if (name.name) {
    Provider.add(name)
      .then(saved => {
        res.status(201).json({ added: saved });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Error adding new child" });
      });
  } else {
    res.status(400).json({ message: "Please provide child data" });
  }
});

// DELETE /api/children/:id endpoint to Delete a child - FUNCTIONAL
router.delete('/:id', (req, res) => {
  Children.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The child has been deleted' });
      } else {
        res.status(400).json({ message: 'Invalid child ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the child' });
    });
});

// GET /api/children/:id/screenings to Retrieve screenings by child - FUNCTIONAL
router.get('/:id/screenings', (req, res) => {
  Children.findScreenings(req.params.id)
    .then(screenings => {
      if (screenings.length) {
        res.status(200).json(screenings);
      } else {
        res.status(404).json({
          message: 'Could not find find screenings for given provider',
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get screenings' });
    });
});

// POST /api/children/:id/screenings to Create a new screening by child -
router.post('/:id/screenings', (req, res) => {
  const screening = req.body;
  screening.child_id = req.params.id;
  console.log(screening);

  if (screening.date && screening.height && screening.weight) {
    Screenings.add(screening)
      .then(saved => {
        res.status(201).json({ added: saved });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Error adding new screening' });
      });
  } else {
    res.status(400).json({ message: 'Please provide screening information' });
  }
});

// **********************************************************************

module.exports = router;
