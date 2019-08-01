const express = require('express');
const router = express.Router();


router.get("/", (req, res) => {
    res.render("quizzes.hbs")
})

router.get("/create_quiz1", (req, res) => {
    res.render("createQuiz1.hbs")
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