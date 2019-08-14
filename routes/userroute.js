const express = require('express');
const router = express.Router();

const bodyparser = require("body-parser")

const urlencoder = bodyparser.urlencoded({
    extended: false
});

const {
    User
} = require("../model/user.js")

router.get("/", (req, res) => {

    if (req.session) {
        res.render("profile.hbs", {
            username: req.session.username
        })
    } else {
        console.log("no session found")
    }

})

router.get("/edit_profile", (req, res) => {
    res.render("edit-profile.hbs")
})

router.post("/update-password", urlencoder, (req, res) => {
    let oldpass = req.body.oldpass
    let newpass = req.body.newpass
    let username = req.session.username


    User.getUser(username, (err, doc) => {
        if (doc === null) {
            res.send("User not logged in")
        } else {
            if (doc.validPassword(oldpass)) {
                User.updatePassword(doc._id, newpass, (err, doc) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("1")
                    }
                })
            } else {
                res.send("Incorrect Password")
            }
        }
    })
})





module.exports = router;