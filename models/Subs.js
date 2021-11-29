var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Subs = new Schema(
  {

    mail: String

  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Subs", Subs);