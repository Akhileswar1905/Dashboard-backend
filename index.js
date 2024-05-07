const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./UserRouter");
require("dotenv").config();

main().catch((err) => console.log(err));

async function main() {
  console.log("Database connection established");
}

const port = process.env.PORT || 5000;

// middleware
server.use(cors());
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: false }));
server.use(router);

server.get("/", (req, res) => {
  res.send("Hello, world!");
});

server.listen(port, async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`Server listening at http://localhost:${port}`);
});
