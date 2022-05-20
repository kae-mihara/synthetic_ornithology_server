const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config();
var https = require("https");

const app = express();
app.use(express.static(__dirname + "/dist"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});

app.use(express.static("public"));
app.use(express.json({ limit: "100mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {

  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
    
  });
});

app.post("/api", (request, response) => {
  console.log("We got a post");

  const data = request.body;
  console.log(data);
  let buff = new Buffer.from(data.audio, "base64");
  fs.writeFileSync("public/audiofiles/" + data.timeStamp + ".wav", buff);
  delete data.audio;

  fs.writeFileSync(
    "public/weatherData/" + data.timeStamp + ".json",
    JSON.stringify(data, null, 2),
    "utf-8"
  );

  database.insert(data);
  response.json(data.timeStamp + "_success");
});
