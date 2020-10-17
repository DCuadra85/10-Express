// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./db.json")

// Express setup

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.static('public'));

// Data Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes and redirects

// read files in db

app.get("/api/notes", function (req, res) {
    fs.readFile("db.json", "utf8", function (err, data) {
        if (err) {
            return console.log("Error:" + err);
        }
        res.json(JSON.parse(data));
    })
});

//Create New Notes / post
app.post("/api/notes", function (req, res) {
    const numberID = Math.floor((Math.random() * 100))
    const noteBody =
    {
        id: numberID,
        title: req.body.title,
        note: req.body.text,
    };
    // console.log(noteBody);

    fs.readFile("db.json", "utf8", function (err, data) {
        if (err) {
            console.log("Error:" + err);
        }
        const mainNote = JSON.parse(data);
        // console.log("mainNote" + mainNote)
        mainNote.push(noteBody);
        // console.log("notes:" + JSON.stringify(mainNote));

        fs.writeFile("db.json", JSON.stringify(mainNote, null, 2), function (err) {
            if (err) {
                console.log("Error:" + err);
            }
            else {
                res.json(mainNote);
                console.log("Note saved.");
            }
        });
    });
});;

//Delete files on db
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("db.json", "utf8", function (err, data) {
        if (err) {
            return console.log("Error:" + err);
        }
        const findNote = JSON.parse(data)
        console.log("locate statement")

        findNote.forEach(element => {
            // console.log("element ID: " element.id);
            // console.log("req ID: " + req.params.id);
            if (element.id == req.params.id) {
                findNote.splice(element, 1);
                console.log("splice element")
            }
            console.log("nothing else to delete")
        });

        fs.writeFile("db.json", JSON.stringify(findNote, null, 2), function (err) {
            if (err) {
                console.log("Error:" + err);
            }
            res.json(db);
            console.log("note deleted");
        })
    })
})


//get html files

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});


// start server
app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT)
})