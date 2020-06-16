import express from "express";
import path from "path";

const app = express();
const dir = path.resolve();
const reactAppFile = path.join(dir, "frontend/build/index.html");
app.use(express.static(path.join(dir, "frontend/build")));

app.get("/api/test", (req, res) => {
  console.log("Got an API request.");
  res.json({ "backend is up": true });
});

/* Catchall */

app.get("*", (req, res) => {
  console.log("Got a frontend request.");
  res.sendFile(reactAppFile);
});

/* Start express server */

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`System is listening on port ${port}`);
