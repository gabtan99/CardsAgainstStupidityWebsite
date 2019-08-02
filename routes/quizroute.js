const express = require('express');
const router = express.Router();

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

router.get("/sendquiz1info", (req, res) => {
    let title = req.query.title
    let subject = req.query.subject
    let description = req.query.description
    console.log("fsdafdf")
    console.log(title)
    console.log(subject)
    console.log(description)
    var author = new User({
        name: 'Schuyler Ng',
        username: 'schuyl3r',
        password: 'pass'
    })

   // Quiz.createQuiz(title, author, subject, description, true, [])

    //res.redirect("create_quiz2")
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