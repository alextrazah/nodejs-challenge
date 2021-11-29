var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Contact = new Schema(
  {
    nom: String,
    mail: String,
    sujet: String,
    message: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Contact", Contact);