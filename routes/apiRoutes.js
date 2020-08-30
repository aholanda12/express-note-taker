// Variables
const path = require("path");
const router = require("express").Router()
const fs = require("fs")
let notesData = [];

// Get function retrieves notes and renders them to the sidebar
router.get("/notes", function(req, res){
notesData = fs.readFileSync("./db/db.json", "utf8")
notesData = JSON.parse(notesData)
res.json(notesData)
})

// Post function allows for new notes to be created and added to the array
router.post("/notes", function(req, res){
  notesData = fs.readFileSync("./db/db.json", "utf8")
  notesData = JSON.parse(notesData)
  req.body.id = notesData.length
  notesData.push(req.body)
  notesData = JSON.stringify(notesData)
  fs.writeFile("./db/db.json", notesData, "utf8", function(err){
    if(err) throw err
  })
  res.json(JSON.parse(notesData))
})

// Delete function rewrites the array minus the id of the deleted note
router.delete("/notes/:id", (req, res) => {
  notesData = fs.readFileSync("./db/db.json", "utf8")
  notesData = JSON.parse(notesData)
  notesData = notesData.filter( function(note){
    return note.id != req.params.id
  }); 
  notesData = JSON.stringify(notesData)
  fs.writeFile("./db/db.json", notesData, "utf8", function(err){
    if(err) throw err
  })
  res.json(JSON.parse(notesData))
});

// Export
module.exports = router