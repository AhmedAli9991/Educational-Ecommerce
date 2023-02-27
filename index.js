const connection = require("mongoose").connection;
const express = require("express");
const routes = require("./router/index");
const connect = require("./db/connections");

var app = express();

//used to make body parsable and allow json requests and response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Calls the Routers present in the routers files
app.use(routes);

//function connects app to mongoDB
connect();

//Waits for the Mongoose to connect to mongoDB and ones it does it atarts listening on port 4000
connection.on("connected", () => {
  app.listen(4000, () => console.log("Listening on port 4000")); //TODO- Dont use this, instead grab from Config
});
