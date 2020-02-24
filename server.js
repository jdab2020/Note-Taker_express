// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const savedNotes = require("./db/db.json");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Display all notes
app.get("/api/notes", function(req,res){
    res.json(savedNotes);
});

// Posting new notes
app.post("/api/notes", function(req,res){
    let newNote = req.body;
    // Give an id for deleting
    let id = savedNotes.length;
    newNote.id = id;
    console.log(newNote);
    saveToDB(newNote);
    res.json(newNote);
});

// Saving into database
const saveToDB = (note) => {
    fs.writeFileSync("./db/db.json",note, (err) => {
        if (err) return console.log(err);
    })
}

// Deleting notes


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

