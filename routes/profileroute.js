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
    res.render("profile.hbs")
})

router.get("/edit_profile", (req, res) => {
    res.render("edit-profile.hbs")
})



module.exports = router;