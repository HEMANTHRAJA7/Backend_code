import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("<h1>hello</h1>");
});

app.get("/about", (req,res) => {
    res.send("<p>Hemanth</p>");
});

app.get("/contact", (req,res) => {
    res.send("<h2>8610364790</h2>");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
