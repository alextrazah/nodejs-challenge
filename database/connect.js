const mongoose = require("mongoose");


const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose
  .connect(process.env.URI, options)
  .then(() => console.log("Connected to Mongo"))
  .catch((err) => console.log(err));
