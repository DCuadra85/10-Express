// Dependencies
const express = require("express");
const path = require("path")

// Express setup

const app = express();
const PORT = process.env.PORT || 8000;

// Data Parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Arrays TBD

//routes and redirects

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// start server
app.listen(PORT, function() {
    console.log("App listening on PORT http://localhost:" + PORT)
})