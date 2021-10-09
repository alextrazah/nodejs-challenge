var express = require("express");
var router = express.Router();
var User = require("../models/Users.model");
const passport = require("passport");
// Get all users
router.get(
  "/",
  passport.authenticate("bearer", { session: false }),
  async (req, res) => {
    try {
      console.log(req.user);
      const allUsers = await User.find({}).populate("ToDo");
      res.json(allUsers);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "internal server err" });
    }
  }
);

// add todo to user
router.post("/addtodo/:id", async (req, res) => {
  try {
    const addtodo = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { ToDo: req.body.ToDo } },
      { new: true }
    );
    res.json(addtodo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }
});
// delete todo to user

router.get("/deletetodo/:id", async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { ToDo: req.body.ToDo } },
      { new: true }
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }
});

// Get User by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }
});

//Add User

router.post("/", async (req, res) => {
  const newuser = await User.create(req.body);
  res.json(newuser);
});
//Register
router.post("/register", async (req, res) => {
  const newuser = await User.create(req.body);
  res.json(newuser);
});

//Delete User

router.put("/:id", async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json({ message: "User updated succesfully" });
});

//Delete User
router.delete("/:id", async (req, res) => {
  await User.findOneAndDelete(req.params.id);
  res.json({ message: "user deleted succesfully" });
});
module.exports = router;
