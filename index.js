const connection = require("mongoose").connection;
const express = require("express");
const Routes = require("./Routes");
const connect = require("./DB/Connection");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(Routes);

connect();

connection.on("connected", () => {
  app.listen(4000, () => console.log("Listening on port 4000"));
});
