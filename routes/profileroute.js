const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.render("profile.hbs")
})

router.get("/edit_profile", (req, res) => {
    res.render("edit-profile.hbs")
})



module.exports = router;