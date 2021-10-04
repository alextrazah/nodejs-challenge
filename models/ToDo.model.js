var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ToDo = new Schema(
  {
    nom: String,
    description: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("ToDo", ToDo);
