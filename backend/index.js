import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import path from "path";

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const dir = path.resolve();
const reactAppFile = path.join(dir, "frontend/build/index.html");
app.use(express.static(path.join(dir, "frontend/build")));

/* Request processing */

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

/* Start express server */

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`System is listening on port ${port}`);
