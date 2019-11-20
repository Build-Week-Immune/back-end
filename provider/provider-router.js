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
router.get('/:id',restricted,  (req, res) => {
   Provider.findById(req.params.id)
     .then(country => {
       if (country) {
         res.status(200).json(country);
       } else {
         res
           .status(404)
           .json({ message: "Could not find provider with given ID" });
       }
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ message: "Failed to get provider" });
     });
});

// POST /api/provider endpoint to Create a new provider - FUNCTIONAL
// router.post('/',restricted,(req, res) => {
//   const name = req.body;

//   if (name.name) {
//     Provider.add(name)
//       .then(saved => {
//         res.status(201).json({ added: saved });
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json({ message: "Error adding new provider" });
//       });
//   } else {
//     res.status(400).json({ message: "Please provide provider name" });
//   }
// });

// PUT /api/provider/:id endpoint to Update a provider- 

router.put("/:id", async (req, res) => {
  try {
    const trip = await Provider.update(req.params.id, req.body);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: "Uh-oh! provider could not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Bummer. Error updating the provider" });
  }
});


// DELETE /api/provider/:id endpoint to Delete a provider - FUNCTIONAL
router.delete('/:id',restricted,  (req, res) => {
   Provider.remove(req.params.id)
     .then(count => {
       if (count) {
         res.status(200).json({ message: "The provider has been deleted" });
       } else {
         res.status(404).json({ message: "Invalid provider ID" });
       }
     })
     .catch(err => {
       console.log(err);
       res.status(500).json({ message: "Error deleting the provider" });
     });
});

// GET /api/provider/:id/immunization to Retrieve immunization by provider- FUNCTIONAL
router.get("/:id/immunization", (req, res) => {
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

// POST /api/provider/:id/immunization to Create a new immunization by provider - FUNCTIONAL
router.post("/:id/immunization",restricted, (req, res) => {
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
router.post("/", async (req, res) => {
  try {
    const trip = await Provider.add(req.body);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({
      message: "Bummer. Error adding the provider"
    });
  }
});
// **********************************************************************

module.exports = router;
