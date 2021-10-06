var express = require('express');
var router = express.Router();
var User = require('../models/Users.model');
// Get all todo
router.get("/",  async (req, res) =>{
    try{
        const allUsers = await User.find({}).populate("ToDo");
        res.json(allUsers);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server err"});
    }
  });

// add todo to user
  router.post("/addtodo/:id",  async (req, res) =>{
    try{
        const userUpdated = await User.findByIdAndUpdate(req.params.id,{$push:{ ToDo: req.body.ToDo }}, {new : true});
        res.json(userUpdated);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server err"});
    }
  });
  router.get("/deletetodo/:id",  async (req, res) =>{
    try{
        const data = await User.findByIdAndUpdate(req.params.id,{$pull:{ ToDo: req.body.ToDo }}, {new : true});
        res.json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server err"});
    }
  });

  router.get("/mail",  async (req, res) =>{
    try{
      
        res.send("mail sended");
    }catch(err){
        console.log(err);
        res.status(500).json({message:"internal server err"});
    }

  });
// Get User by ID
router.get('/:id', async (req, res) => {
    User.findById(req.params.id,function(err,data){
      if(err) throw err;
      res.json(data);
    })
  });

//Add User 

router.post("/add", async function (req, res, next) {
    User.create(req.body);
    res.send("Done");
  });

  
//Delete User  
router.delete('/:id',function(req, res, next) {
    User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ msg: `Post with id : ${req.params.id} has been removed` }))
    .catch(err => res.status(400).json({ error: err }))
})

module.exports = router;
