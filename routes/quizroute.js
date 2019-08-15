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


router.get("/", async (req, res) => {
    let username = req.session.username
    User.getUser(username, async (err, doc) => {
        if (err) {
            res.send(err)
        } else if (doc) {
            let myQuizObjects = await Quiz.findQuizzes(doc)
            
            await User.getUser(username, async (err, doc) => {
                let results = await Quiz.getQuizzesById(doc.pinnedQuizzes)
                res.render("quizzes.hbs", {
                    quizzes: myQuizObjects,
                    pinnedquizzes: results
                })
            })
            

           
        }
    })
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



// /edit is now /edit_quiz


router.get("/update_quiz", (req, res) => {
    let username = req.session.username
    let id = req.query.id
    let title = req.query.title
    let subject = req.query.subject
    let description = req.query.description
    let public = req.query.public
    let deck = req.query.deck
    console.log(public)
    User.getUser(username, (err, doc) => {
        Quiz.updateQuiz(id, title, doc, subject, description, public, deck, (err, doc) => {
            if (err) {
                console.log(err)
            } else {
                res.send("1")
            }
        })
    })
})
router.get("/unpin_quiz", (req, res) => {

    let username = req.session.username
    let quizID = req.query.id

    User.getUser(username, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            User.removeQuizToPinned(doc._id, quizID, (err, doc) => {
                if (err) {
                    console.log(err)
                    res.send("0")
                } else {
                    console.log("unpin success!")
                    res.send("1")
                }
            })
        }
    })



})

router.get("/edit_quiz", async (req, res) => {
    res.render("edit-quiz.hbs", {
        quiz: await Quiz.retrieveQuiz(req.query.id)
    })

})

router.get("/pin_quiz", async (req, res) => {

    let username = req.session.username
    let quizID = req.query.id
    let userID

    User.getUser(username, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            userID = doc._id
        }
    })

    let result = await Quiz.retrieveQuiz(quizID)



    User.addQuizToPinned(userID, result, (err, doc) => {
        if (err) {
            console.log(err)
            res.send("0")
        } else {
            console.log("pin success!")
            res.send("1")
        }
    })
})



router.get("/take_quiz", (req, res) => {
    res.render("take-quiz.hbs", {
        quizID: req.query.id
    })
})

router.get("/retrieve_quiz", async (req, res) => {

    let quiz_id = req.query.qid
    let quiz = await Quiz.retrieveQuiz(quiz_id)

    if (quiz === null) {
        res.send("0")
    } else {
        res.send(quiz)
    }
})

module.exports = router;