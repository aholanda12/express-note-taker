// Variables
const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const app = express();

// Local host
var PORT = process.env.PORT || 3001;

// Listens and ties everything together
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))
app.use("/api", apiRoutes)
app.use("/", htmlRoutes)
app.listen(PORT, function() {
    console.log("App is listening on PORT" + PORT)
})