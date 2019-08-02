const express = require('express');
const router = express.Router();

const bodyparser = require("body-parser")

const urlencoder = bodyparser.urlencoded({
    extended: false
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

router.get("/create_quiz1", (req, res) => {
    res.render("createQuiz1.hbs")
})

router.get("/quiz2info", urlencoder, (req, res) => {
    var title = req.body.title
    var subject = req.body.subject
    var description = req.body.description

    var author = new User({
        name: 'Schuyler Ng',
        username: 'schuyl3r',
        password: 'pass'
    })

    Quiz.createQuiz(title, author, subject, description, true, [])

    res.redirect("create_quiz2")
})


router.get("/create_quiz2", (req, res) => {
    res.render("createQuiz2.hbs")
})

router.get("/create_quiz3", (req, res) => {
    res.render("createQuiz3.hbs")
})

router.get("/active_quiz", (req, res) => {
    res.render("active-quiz.hbs")
})

router.get("/edit_quiz", (req, res) => {
    res.render("edit-quiz.hbs")
})


module.exports = router;