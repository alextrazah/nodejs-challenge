var express = require('express');
var router = express.Router();
var Todo = require('../models/ToDo.model');

// Get all todo
router.get("/",  async (req, res) =>{
    try{
        const data = await Todo.find({});
        res.json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server err"});
    }
  });


  router.get("/test", async (req, res) =>{
    res.send("data");

  });
// Get todo by ID
router.get('/:id',async (req, res) => {
    Todo.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add todo 

router.post("/add", async (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    Todo.create(obj);
    res.send("Done");
  });


//Delete todo  
router.delete('/:id',async (req, res) => {
    Todo.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Post with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
