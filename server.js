// Dependencies
const express = require("express");
const path = require("path")

// Express setup

const app = express();
const PORT = process.env.PORT || 8000;

// Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Arrays TBD

//routes and redirects
//get html files
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/develop/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/develop/public/notes.html"));
})

//Create New Notes
app.post("/api/notes", function (req, res) {
    const numberID = Math.floor((Math.random() * 100))
    const noteBody =
    {
        id: numberID,
        title: req.body.title,
        note: req.body.text,
    };
    console.log(noteBody);

    
    // noteBody.routeName = noteBody.
    // noteBody.push(noteBody);
    // res.json(noteBody);
});

// start server
app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT)
})