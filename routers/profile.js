const express = require("express")
const router = express.Router()
const userDb = require("../model/user")
const bcryptjs = require("bcryptjs")

router.get("/addUser", (req, res)=>{
    res.render("cons", {
        title: "Foydalanuvchi yaratish",
        createUser: true
    })
})



router.post("/addUser", (req, res)=>{
    const {username, lastname, email, login , region, password}= req.body
    bcryptjs.hash(password, 10, (err, hash)=>{
        if(err) throw err
        const db = new userDb({
            username: username,
            lastname: lastname,
            email: email,
            login: login,
            region: region,
            password: hash
        })
        db.save().then(data=>{
            res.redirect("/cons")
        })
    })  
})


module.exports = router