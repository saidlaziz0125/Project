const express = require("express")
const router = express.Router()
const userDb = require("../model/user")
const bcryptjs = require("bcryptjs")

router.get("/", (req, res)=>{
    res.render("adminLogin", {
        title: "Kirish"
    })
})


router.post("/", (req, res)=>{
    const {login, password}=req.body

    if (login=="admin" && password=='1') {
        res.render("cons", {
            title : "Admin panel"
        })
    }else {
        const {login, password}=req.body
        userDb.findOne({login: login}, (err, data)=>{
            if(err)  {
                res.render("adminLogin", {
                    title: "Errrorrrr"
                })
            }else if(!data) {
                res.render("adminLogin", {
                    title: "Kirish",
                    txt: "Login yoki parolda xatolik bor"
                })
            }
            else {
                bcryptjs.compare(password, data.password).then(data1=>{
                    if(!data1) {
                        res.render("adminLogin", {
                            title: "Kirish",
                            txt: "Login yoki parolda xatolik bor"
                        })
                    }
                    else {
                        res.render("profile", {
                            title: `${data.username}'s profile`,
                            data:data 
                        })

                        
                    }
                })
            }
        })
    }

})


module.exports = router