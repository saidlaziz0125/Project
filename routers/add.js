const express = require("express")
const router = express.Router()
const noteDb = require("../model/data")
const userDb = require("../model/user")


router.get("/dayAdd/:id", (req, res)=>{
    res.render("add", {
        title: "Kunlik qo'shish",
    })
})


router.post("/dayAdd/:id", (req, res)=>{
    userDb.findById(req.params.id, (err, data)=>{
        const {ferma, kelganSut, jir, kimOlibKeldi, perePul, naqdPul, date, userId, sutNarxi}= req.body
        const db = new noteDb({
            kelganSut:kelganSut,
            jir:jir,
            kimOlibKeldi:kimOlibKeldi,
            perePul: perePul,
            naqdPul: naqdPul,
            date: date,
            sutNarxi: sutNarxi,
            ferma: ferma,
            userId: data.id
        })
        db.save()
        res.redirect("/")
    })
})








module.exports = router