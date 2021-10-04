const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
//import routes
const todoRouter = require("./routes/ToDo.route");
const userRouter = require("./routes/Users.route");
// .env config
require("dotenv").config();

// import connect
require("./database/connect");
const app = express();


app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("dev"));

app.get("/",  (req, res) => {
    res.send({message:"hello world"});
});
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);

app.listen(8080);
