var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact");
var subs = require("../models/Subs");
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





router.get("/subs",async (req, res) => {
    try {
     
      const mysubs = await subs.find({});
      res.render("subs", { allsubs: mysubs, moment: moment  });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "internal server err" });
    }
  }
);

//Add contact

router.post("/", async (req, res) => {
  //  console.log(req);
  const newcontact = await Contact.create(req.body);
  res.json(newcontact);
});

router.post("/addsub", async (req, res) => {
  //  console.log(req);
  const newsub = await subs.create(req.body);
  res.json(newsub);
});



//Delete contact
router.get("/delete/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  const allcontacts = await Contact.find({});
      res.render("contact", { contacts: allcontacts, moment: moment  });

});

//Delete contact
router.get("/deletesub/:id", async (req, res) => {
    await subs.findByIdAndDelete(req.params.id);
    const allsubs = await subs.find({});
        res.render("subs", { allsubs: allsubs, moment: moment  });
  
  });
module.exports = router;
