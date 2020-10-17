// Dependencies
const express = require("express");
const { fstat } = require("fs");
const path = require("path")

// Express setup

const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.static('public'));

// Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Arrays TBD

//routes and redirects
//get html files
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
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
   
    fs.readFile("db.json", "utf8", function (err, res){
        if (err) {
            console.log("Error:" + err);
        }
        const mainNotes = JSON.parse(res);
        //console.log("mainNotes"+mainNotes)
        mainNotes.push(noteBody);
        console.log("notes:" + JSON.stringify(mainNotes));
    })

    fs.writeFile("db.json", JSON.stringify(mainNotes, null, 2), function(err){
        if (err){
            console.log("Error:" + err);
        }
        else{
            res.json(mainNotes);
            console.log("Note saved.");
        }
    })

    // noteBody.routeName = noteBody.
    // noteBody.push(noteBody);
    // res.json(noteBody);
});

// read files in db

app.get("/api/notes", function (req, res) {
    fs.readFile("./db.json", "utf8", function (err, res) {
        if (err) {
            return console.log("Error:" + err);
        }
        res.json(JSON.parse(res));
    })
});

//Delete files on db
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("./db.json", "utf8", function (err, res) {
        if (err) {
            return console.log ("Error:" + err);
        }
    })
})

// start server
app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT)
})