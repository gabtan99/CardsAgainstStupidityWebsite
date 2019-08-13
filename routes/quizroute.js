const express = require('express');
const router = express.Router();
const bodyparser = require("body-parser")


const urlencoder = bodyparser.urlencoded({
    extended: true
});

const {
    Quiz
} = require("../model/quiz.js")

const {
    User
} = require("../model/user.js")

router.get("/", (req, res) => {
    res.render("quizzes.hbs")
})

router.get("/pre_start", (req, res) => {
    res.render("prestart.hbs")
})

router.get("/results_quiz", (req, res) => {
    res.render("results.hbs")
})

router.get("/create_quiz", (req, res) => {
    res.render("createQuiz.hbs")
})

router.get("/submit_new_quiz", urlencoder, (req, res) => {

    console.log(req.query.title)
    res.send("1")
})

router.get("/active_quiz", (req, res) => {
    res.render("active-quiz.hbs")
})

router.get("/edit_quiz", (req, res) => {
    res.render("edit-quiz.hbs")
})


module.exports = router;