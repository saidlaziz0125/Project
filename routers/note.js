const express = require("express")
const router = express.Router()
const userDb = require("../model/user")
const noteDb = require("../model/data")
const mutedNoteDb = require("../model/mutedData")


router.get("/note/settings/:id", (req, res)=>{
    noteDb.findById(req.params.id, (err, data)=>{
        if(err) throw err
        res.render("add", {
            title: "Sozlash",
            datas: data
        })
    })
})


router.post("/note/settings/:id", (req, res)=>{
    const {ferma, kelganSut, jir, kimOlibKeldi, perePul, naqdPul, date, userId, sutNarxi}= req.body
    const db ={
        kelganSut:kelganSut,
        jir:jir,
        kimOlibKeldi:kimOlibKeldi,
        perePul: perePul,
        naqdPul: naqdPul,
        sutNarxi: sutNarxi,
        ferma: ferma,
    }

    noteDb.findByIdAndUpdate(req.params.id, db, (err, data)=>{
        if(err) throw err
        res.redirect("/cons")

    })
})



router.get("/note/delete/:id", (req, res)=>{
    noteDb.findByIdAndDelete(req.params.id, (err, data)=>{
        if(err) throw err
        else{
            const db = new mutedNoteDb({
                _id: data._id,
                kelganSut: data.kelganSut,
                jir: data.jir,
                kimOlibKeldi: data.kimOlibKeldi,
                perePul: data.perePul,
                naqdPul: data.naqdPul,
                sutNarxi: data.sutNarxi,
                ferma: data.ferma,
                date: data.date,
                userId: data.userId
            })
            db.save()
            // console.log(data);
            res.redirect("/cons")
        }
    })
})



module.exports = router