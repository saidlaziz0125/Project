const express= require("express")
const router = express.Router()
const userDb = require("../model/user")
const noteDb = require("../model/data")
const mutedUserDb = require("../model/mutedUser")
const mutedNoteDb = require("../model/mutedData")
const mongoose = require("mongoose")

// simple place
router.get("/cons", (req, res)=>{
    noteDb.find({}, (err, data)=>{
        res.render("cons", {
            title: "Admin panel",
            noteFerma: data  
        })
    })
    
})

// page for farms
router.get("/ferma/:id", (req, res)=>{
    noteDb.findById(req.params.id, (err, data)=>{
        let ferma = data.ferma;
        noteDb.find({ferma: ferma}, (err, data1)=>{
            res.render("cons", {
                title: `${data.ferma} fermasi`,
                noteData: data1
            })
            console.log(data1);
            router.get("/noteData", (req, res)=>{
                let {from_date, to_date}= req.query
                let from_time = new Date(from_date).toLocaleDateString();
                let to_time = new Date(to_date).toLocaleDateString();
                // console.log(data.date.toLocaleDateString());
                let d;
                data1.forEach((element, index) => {
                    d = element.date.toLocaleDateString()
                });
                console.log(d);
                console.log(from_time);
                console.log(to_time);
                const promise = noteDb.find({date: {"$gte": (from_time) , "$lte" : (to_time)}})
                promise.then(data2=>{
                    // console.log(data2);
                })
            })

        })
    })
   
})



// user view for admin P
router.get("/user/view", (req, res)=>{
    userDb.find({}, (err, dataUser)=>{
        res.render("cons", {
            title: "Foydalanuvchilar",
            userData:dataUser,
        })
    })
})





// remove user from desktop to outcast
router.get("/admin/delete/user/:userId", (req, res)=>{
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
                const db = new mutedUserDb({
                    _id: data1._id,
                    username: data1.username,
                    lastname: data1.lastname,
                    email: data1.email,
                    login: data1.login,
                    region: data1.region,
                    password: data1.password
                })
                db.save()
                data.forEach((element, value) => {
                    noteDb.findByIdAndDelete(element.notes._id, (err, data2)=>{
                        if(err) throw err
                        const dbNote = new mutedNoteDb({
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
                    })
                });
                res.redirect("/user/view")

            }
        })
    })

})

// ///////////////////////////////////////////////////////////////// CHART JS


router.get("/chart", (req, res)=>{
    noteDb.find({}, (err, data)=>{
        res.render("cons", {
            title: "Natijalar",
            chartData: data
        })
    })   

})

// for chart fetch()
router.get("/note", (req, res)=>{
    noteDb.find({}, (err, data)=>{
        res.send(data)
    })
})


module.exports = router