import express from "express";
import path from "path";

const app = express();
const dir = path.resolve();
const reactAppFile = path.join(dir + "/client/build/index.html");
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

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Listening on port ${port}`);
