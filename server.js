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
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Display all notes
app.get("/api/notes", function(req,res){
    // console.log("displaying",savedNotes);
    res.json(savedNotes);
});

// Posting new notes
app.post("/api/notes", function(req,res){
    let newNote = req.body;
    // console.log("newNote",newNote);
    // Give an id for deleting
    let id = savedNotes.length;
    console.log(id,"id");
    newNote.id = `${id}`;
    // console.log(newNote,"typed new notes");
    savedNotes.push(newNote);
    // console.log(savedNotes,"pushing");
    saveToDB(savedNotes);
    res.json(savedNotes);
});

// Saving into database
const saveToDB = (note) => {
    fs.writeFileSync("./db/db.json",note, (err) => {
        // console.log("saving now");
        if (err) return console.log(err);
    })
}

// Deleting notes
app.delete("/api/notes/:id", function (req,res){
    var chosenId = req.params.id;
    // console.log(chosenId,"req.params.id");
    for (let i = 0; i < savedNotes.length; i++) {
        if (chosenId === savedNotes[i].id) {
            // console.log("selection for deleting",savedNotes);
            savedNotes.splice(i,1);
            // console.log("after deletion",savedNotes);
            saveToDB(JSON.stringify(savedNotes));
            res.json(savedNotes);
        }
    }    
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

