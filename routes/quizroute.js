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
    let username = req.session.username
    
    User.getUser(username, (err, doc) => {
        if(err){
            res.send(err)
        }else if(doc){
            Quiz.findQuizzes(doc, (err, doc) => {
                if(err){
                    res.send(err)
                }else{
                    console.log(doc)
                }
            })
        }
    })
    res.render("quizzes.hbs")
})


router.get("/results_quiz", (req, res) => {
    res.render("results.hbs")
})

router.get("/create_quiz", (req, res) => {

    res.render("createQuiz.hbs")
})

router.get("/submit_new_quiz", urlencoder, (req, res) => {

    let username = req.session.username

    let title = req.query.title
    let subject = req.query.subject
    let description = req.query.description
    let public = req.query.public
    let deck = req.query.deck


    User.getUser(username, (err, doc) => {


        Quiz.createQuiz(title, doc, subject, description, public, deck, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                res.send("1")
            }
        })
    })
})

router.get("/retrieve_quiz", (req, res) => {

    let quiz_id = req.query.qid
    Quiz.retrieveQuiz(quiz_id, (err, doc) => {


        if (doc === null) {
            res.send("0")
        } else {
            res.send(doc)
        }
    })
})

router.get("/take_quiz", (req, res) => {
    res.render("take-quiz.hbs")
})

router.get("/edit_quiz", (req, res) => {
    res.render("edit-quiz.hbs")
})


module.exports = router;