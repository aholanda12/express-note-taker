// Variables
const path = require("path");
const router = require("express").Router()

// Renders the path to the hrml
router.get("/notes", function(req, res){
  res.sendFile(path.join(__dirname, "../public/notes.html"))
})

// Export
module.exports = router