const express = require("express");
var bcrypt = require("bcrypt");
const User = require("../models/Users.model");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Register new User
router.post("/register", async (req, res) => {
  const usercheck = await User.findOne({ email: req.body.email });
  if (usercheck !== null) {
    return res.status(400).json({ message: "E-mail exists" });
  }
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  const myuser = req.body;
  myuser.password = hashedpassword;
  const registreduser = await User.create(myuser);
  res.json(registreduser);
});

router.post("/login", async (req, res) => {
  const myuser = await User.findOne({ email: req.body.email });
  if (myuser === null) {
    return res.status(404).json({ message: "wrong credits" });
  } else {
    // 0. verify if the same password
    if (!bcrypt.compareSync(req.body.password, myuser.password)) {
      return res.status(404).json({ message: "wrong credits" });
    } else {
      // 1. create a jwt token
      const tokendata = {
        email: myuser.email,
        userId: myuser._id,
      };
      const createdToken = jwt.sign(tokendata, process.env.SECRET, {
        expiresIn: "1h",
      });
      // 2. send response
      return res
        .status(200)
        .json({ message: "login done!", token: createdToken });
    }
  }
});

// Login new User

module.exports = router;
