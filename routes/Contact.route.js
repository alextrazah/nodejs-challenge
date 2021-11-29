var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact");
var moment = require('moment');

// Get all contacts

router.get("/",async (req, res) => {
    try {
     
      const allcontacts = await Contact.find({});
      res.json(allcontacts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "internal server err" });
    }
  }
);

router.get("/all",async (req, res) => {
    try {
     
      const allcontacts = await Contact.find({});
      res.render("contact", { contacts: allcontacts, moment: moment  });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "internal server err" });
    }
  }
);



// Get contact by ID
router.get("/:id", async (req, res) => {
  try {
    const Contact = await Contact.findById(req.params.id);
    res.json(Contact);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }
});

//Add contact

router.post("/", async (req, res) => {
    console.log(req);
  const newcontact = await Contact.create(req.body);
  res.json(newcontact);
});



//Delete contact
router.get("/delete/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  const allcontacts = await Contact.find({});
      res.render("contact", { contacts: allcontacts, moment: moment  });

});
module.exports = router;
