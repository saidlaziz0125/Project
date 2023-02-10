const express= require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const port = process.env.PORT || '3030'
const rIndex = require("./routers/index")
const rCons = require("./routers/cons")
const rProfile = require("./routers/profile")
const rAdd = require("./routers/add")
const rUser = require("./routers/user")
const rNote = require("./routers/note")
const rMute = require("./routers/muted")
const path = require("path")
//settings part
//mongoose setting
mongoose.connect("mongodb://localhost:27017/Project_n")
const db = mongoose.connection
db.on("open", ()=>{
    console.log("mongodb running");
})
db.on("error", (err)=>{
    console.log("mongodb da xatolik bor");
})


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.set("view engine", "pug")
app.use(express.static(path.join(__dirname, "public")))


app.use(rIndex)
app.use(rCons)
app.use(rProfile)
app.use(rAdd)
app.use(rUser)
app.use(rNote)
app.use(rMute)


app.listen(port, ()=>{
    console.log("server running");
})


// Consolas, 'Courier New', monospace