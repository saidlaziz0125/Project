const express = require("express")
const router = express.Router()
const userDb = require("../model/user")
const noteDb = require("../model/data")
const mongoose  =require("mongoose")



router.get("/dayAdd/view/:userId", (req, res)=>{
    const promise = userDb.aggregate([
        {
            $match: {
                _id : mongoose.Types.ObjectId(req.params.userId)
            }
        },
        {
            $lookup: {
                from: "datas",
                localField: "_id",
                foreignField: "userId",
                as: "notes"
            }
        },
        {
            $unwind: {
                path: "$notes"
            }
        }
    ])
    promise.then(data=>{
        res.render("userNote", {
            title: "Sizning kundaligingiz",
            data:data
        })
    })
})







router.get("/user/settingNote/:id", (req, res)=>{
    noteDb.findById(req.params.id, (err, data)=>{
        if(err) throw err
        else {
            res.render("add", {
                title: "Kundalikni sozlash",
                datas:data
            })
        }
    })
})

router.post("/user/settingNote/:id", (req, res)=>{
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
        res.redirect("/")

    })
})


//    Log Out for Users

router.get("/delete/user/:userId", (req, res)=>{
    const promise = userDb.aggregate([
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.userId)
            }
        },
        {
            $lookup:{
                from: "datas",
                localField: "_id",
                foreignField: "userId",
                as: "notes"
            }
        },
        {
            $unwind: {
                path: "$notes"
            }
        }
    ])

    promise.then(data=>{

        userDb.findByIdAndDelete(req.params.userId, (err, data1)=>{
            if(err) throw err
            else {
                console.log(data1);
                data.forEach((element, value) => {
                    noteDb.findByIdAndDelete(element.notes._id, (err, data2)=>{
                        if(err) throw err
                        console.log(data2);
                    })
                });
                res.redirect("/")

            }
        })
    })
})








module.exports = router