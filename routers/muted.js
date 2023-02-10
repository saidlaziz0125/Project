const express= require("express")
const router = express.Router()
const userDb = require("../model/user")
const mutedUserDb = require("../model/mutedUser")
const noteDb = require("../model/data")
const mutedNoteDb = require("../model/mutedData")
const mongoose = require("mongoose")


// view deletion user
router.get("/reproductionUser", (req, res)=>{
    mutedUserDb.find({}, (err, data)=>{
        res.render("cons", {
            title: "O'chirilgan foydalanuvchilar",
            mutedUser: data
        })
    })
})


//  delete user from muted users
router.get("/mutedUser/delete/:userId", (req, res)=>{
    const promise = mutedUserDb.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.userId)
            }
        },
        {
            $lookup:{
                from: "muteddatas",
                localField: "_id",
                foreignField: "userId",
                as: "mutednotes"
            }
        },
        {
            $unwind: {
                path: "$mutednotes"
            }
        }
    ])
    promise.then(data=>{
        mutedUserDb.findByIdAndDelete(req.params.userId, (err, data1)=>{
            if(err) throw err
            else {
                data.forEach((element, value)=>{
                    mutedNoteDb.findByIdAndDelete(element.mutednotes._id, (err, data2)=>{
                        if(err) throw err
                        res.redirect("/cons")
                    })
                })
            }
        })
    })
})


// return user to userDb width _id
router.get("/returnUser/:userId", (req, res)=>{
    const promise = mutedUserDb.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.userId)
            }
        },
        {
            $lookup:{
                from: "muteddatas",
                localField: "_id",
                foreignField: "userId",
                as: "mutednotes"
            }
        },
        {
            $unwind: {
                path: "$mutednotes"
            }
        }
    ])
    promise.then(data=>{
        mutedUserDb.findByIdAndDelete(req.params.userId, (err, data1)=>{
            if(err) throw err
            else {
                const db =  userDb({
                    _id: data1._id,
                    username: data1.username,
                    lastname: data1.lastname,
                    email: data1.email,
                    login: data1.login,
                    region: data1.region,
                    password: data1.password
                })
                db.save()

                // return muted notes
                data.forEach((element, index)=>{
                    mutedNoteDb.findByIdAndDelete(element.mutednotes._id, (err, data2)=>{
                        if(err) throw err
                        else {
                            const dbNote= new noteDb({
                                _id: data2._id,
                                kelganSut: data2.kelganSut,
                                jir: data2.jir,
                                kimOlibKeldi: data2.kimOlibKeldi,
                                perePul: data2.perePul,
                                naqdPul: data2.naqdPul,
                                sutNarxi: data2.sutNarxi,
                                ferma: data2.ferma,
                                date: data2.date,
                                userId: data2.userId
                            })
                            dbNote.save()

                        }
                    })
                })
                res.redirect("/cons")
                console.log("successfully");
            }
        })
    })
})


// /////////////////////////////////////////////////////////////////////////////////

// view deletion note
router.get("/reproductionNote", (req, res)=>{
    mutedNoteDb.find({}, (err, data)=>{
        res.render("cons", {
            title: "O'chirilgan kundaliklar",
            mutedNote: data
        })
    })
})


// return note to noteDb
router.get("/returnNote/:id", (req, res)=>{
    mutedNoteDb.findByIdAndDelete(req.params.id, (err, data)=>{
        if(err) throw err
        else {
            const db= new noteDb({
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
            res.redirect("/cons")
        }
    })
})


router.get("/deleteNote/:id", (req, res)=>{
    mutedNoteDb.findByIdAndDelete(req.params.id, (err, data)=>{
        if(err) throw err
        res.redirect("/cons")
    })
})

module.exports = router