var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Users = new Schema(
  {
    email:String,
    password:String,
    ToDo: [{ type: Schema.Types.ObjectId, ref: 'ToDo' }],

  },
  { timestamps: true, versionKey: false } 
);

module.exports = mongoose.model("User", Users);