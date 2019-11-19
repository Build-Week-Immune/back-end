const express = require('express');

const Screenings = require('./screening-model');

const router = express.Router();

// ************************************************************************************

// CRUD Endpoints

// GET /api/screenings endpoint to Retrieve screenings -
router.get('/', (req, res) => {
  Screenings.find()
    .then(screening => {
      res.status(200).json(screening);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Failed to get screenings' });
    });
});

// GET /api/screenings/:id endpoint to Retrieve screening by ID -

router.get("/:id", (req, res) => {
  Screenings.findById(req.params.id)
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


// PUT /api/screenings/:id endpoint to Update a screening - NOT ESSENTIAL


// Post /api/screenings/ endpoint to Update a screening 
router.post("/", (req, res) => {
  const screening = req.body;
  Screenings.add(screening)
    .then(saved => {
      res.status(201).json({ added: saved });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error adding new screening" });
    });
});


// DELETE /api/screenings/:id endpoint to Delete a screening -
router.delete('/:id', (req, res) => {
  Screenings.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'The screening has been deleted' });
      } else {
        res.status(400).json({ message: 'Invalid screening ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error deleting the screening' });
    });
});

// ************************************************************************************

module.exports = router;
