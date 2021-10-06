const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

//import routes
const todoRouter = require("./routes/ToDo.route");
const userRouter = require("./routes/Users.route");
const mailRouter = require("./routes/mailApi.route");
const uploadRouter = require("./routes/uploadFileApi.route");
// .env config
require("dotenv").config();

// import connect
require("./database/connect");
const app = express();
const port= process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("dev"));


app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/upload", uploadRouter);
app.listen(port, ()=>{
    console.log("server is listening on ", port);
} )

