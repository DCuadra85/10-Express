// Dependencies
const express = require("express");
const fs = require("fs");
const path = require("path");

// Express setup

const app = express();
const PORT = process.env.PORT || 8080;
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

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

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

    fs.readFile("db.json", "utf8", function (err, res) {
        if (err) {
            console.log("Error:" + err);
        }
        const mainNote = JSON.parse(res);
        console.log("mainNote" + mainNote)
        mainNote.push(noteBody);
        console.log("notes:" + JSON.stringify(mainNote));
    })

    fs.writeFile("db.json", JSON.stringify(mainNote, null, 2), function (err) {
        if (err) {
            console.log("Error:" + err);
        }
        else {
            res.json(mainNote);
            console.log("Note saved.");
        }
    })

});

// read files in db

app.get("/api/notes", function (req, res) {
    fs.readFile("db.json", "utf8", function (err, res) {
        if (err) {
            return console.log("Error:" + err);
        }
        res.json(JSON.parse(res));
    })
});

//Delete files on db
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile("db.json", "utf8", function (err, res) {
        if (err) {
            return console.log("Error:" + err);
        }
        const findNote = JSON.parse(res)
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

// start server
app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT)
})