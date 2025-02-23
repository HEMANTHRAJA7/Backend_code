import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "Liontiger@7",
  port: "5432",
});

db.connect();

const app = express();
const port = 3000;
const saltRounds = 10; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const check = await db.query("SELECT * FROM users WHERE email = $1",[email]);
    if (check.rows.length >0) {
      res.send("Email already exists. Try loggin in. ");
    } else {
      //password hashing
      bcrypt.hash(password, saltRounds, async(err,hash) => {
        if(err){
          console.log("Error hashing password:", err);
        } else {
        const result = await db.query(
          "INSERT INTO users (email,password) VALUES ($1,$2)",
          [email,hash]
        );
        //console.log(hash);
        //console.log(result);
        res.render("secrets.ejs")
      }
      });
    }
  } catch(error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1",[email]);
    if(result.rows.length > 0){
      //console.log(result.rows);
      const user = result.rows[0];
      const storedHashedPassword = user.password;

      bcrypt.compare(loginPassword, storedHashedPassword, async (err, result) => {
        if (err) {
          res.send("Error comparing passwords: ", err);
        } else {
          if (result){
            res.render("secrets.ejs");
          } else {
            res.send("Incorrect password.");
          }
        }
      });
    } else {
      res.send("User not found.");
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
