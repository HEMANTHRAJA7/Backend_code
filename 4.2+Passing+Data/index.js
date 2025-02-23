import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  var first= req.body["fName"];
  var second= req.body["lName"];
  var lf=first.length;
  var ls=second.length;
  var length=lf+ls;
  res.render("index.ejs", {numberOfLetters: length});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
