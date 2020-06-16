/*
 * This is the backend of your new React-Express application.
 * A combination of React and Express, when deployed on Heroku,
 * is the fastest way to get a fully functional demo out the
 * door, and so, I've created this template to facilitate
 * just that. -rcf
 */

import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";
import pg from "pg";
import dotenv from "dotenv";

// Load .env file into environment variables
dotenv.config();

// Set up express app, add helmet and bodyParser middleware
const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Resolve location of React frontend build
const dir = path.resolve();
const reactAppFile = path.join(dir, "frontend/build/index.html");
app.use(express.static(path.join(dir, "frontend/build")));

// Create PostgreSQL connection
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

/*
 * REQUEST RESPONSES SECTION
 */

app.get("/api/get", (req, res) => {
  console.log("Got an API request.");
  res.json({ "backend is up": true });
});

app.post("/api/post", (req, res) => {
  console.log(req.body);
  console.log(JSON.stringify(req.body));
  res.json({ "got it": true, "you sent": req.body.message });
});

app.get("*", (req, res) => {
  console.log("Got a frontend request.");
  res.sendFile(reactAppFile);
});

// Start express server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`System is listening on port ${port}`);
