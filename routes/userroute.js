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





module.exports = router;