var express = require("express");
var router = express.Router();
var Todo = require("../models/ToDo.model");

// Get all todo
router.get("/", async (req, res) => {
  try {
console.log(req);
    const todos = await Todo.find({});
    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }
});

// Get todo by IDd
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }
});

//Add todo

router.post("/", async (req, res) => {
  const createToDo = await Todo.create(req.body);
  res.json(createToDo);
});

//Delete todo
router.delete("/:id", async (req, res) => {
  await Todo.findOneAndDelete(req.params.id);
  res.json({ message: "todo deleted succesfully" });
});

//UPDATE todo
router.put("/:id", async (req, res) => {
 const updatedtodo = await Todo.findByIdAndUpdate(req.params.id,req.body, {new:true});
  res.json({ message: "todo updated succesfully" });
});

module.exports = router;
