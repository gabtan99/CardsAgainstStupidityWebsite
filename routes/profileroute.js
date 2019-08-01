const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.render("profile.hbs")
})

router.get("/edit_profile", (req, res) => {
    res.render("edit-profile.hbs")
})

router.get("/logout", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

module.exports = router;