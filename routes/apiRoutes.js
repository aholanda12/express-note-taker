const path = require("path");
const router = require("express").Router()
const fs = require("fs")
let notesData = [];

router.get("/notes", function(req, res){
  // res.sendFile(path.join(__dirname, "./db/db.json"))
notesData = fs.readFileSync("./db/db.json", "utf8")
notesData = JSON.parse(notesData)
res.json(notesData)
})

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

module.exports = router