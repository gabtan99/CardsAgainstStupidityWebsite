const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")

const app = express()


app.use(express.static(__dirname + "/public"))

const {
    User
} = require("./js/user.js")

const {
    Quiz
} = require("./js/quiz.js")

const {
    Flashcard
} = require("./js/flashcard.js")


const uri = "mongodb://localhost:27017/cardsagainst"
mongoose.Promise = global.Promise
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

// url encoder
const urlencoder = bodyparser.urlencoded({
    extended: false
});




app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home-guest.html")
})

app.get("/answer_quiz", (req, res) => {
    res.sendFile(__dirname + "/public/answer-quiz.html")
})

app.get("/edit_quiz", (req, res)=>{
    res.sendFile(__dirname + "/public/edit-quiz.html")
})

app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/public/profile.html")
})


app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/registration.html")
})


/*
app.get("/create", (req, res) => {
    var deck = []

    var flash1 = new Flashcard({
        question: "What is 1+1",
        answer: "2"
    })

    var flash2 = new Flashcard({
        question: "What is 2+2",
        answer: "4"
    })

    flash1.save()
    flash2.save()

    deck.push(flash1)
    deck.push(flash2)


    var quiz = new Quiz({
        title: "Midterms",
        author: "Denzel Co",
        subject: "AUTOMAT",
        description: "Chapter 1-5",
        public: false,
        deck: deck
    })

    Flashcard.findOne({
        _id: "5d418a2a8840af6871427ee1"
    }, (err, doc) => {
        console.log(doc)
    })
})
*/



app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.get("/create_quiz", (req, res) => {
    res.sendFile(__dirname + "/public/create-quiz.html")
})

app.get("/add_card", (req, res) => {
    res.sendFile(__dirname + "/public/add-card.html")
})


app.post("/createAccount", urlencoder, (req, res) => {
    var name = req.body.name
    var username = req.body.username
    var password = req.body.password
    var confirm = req.body.confirm

    let user = new User({
        name,
        username,
        password
    })


    user.save().then((doc) => {
        console.log(doc)
        res.redirect("/")
    }, (err) => {
        res.send(err)
    })

})



app.listen(9090, function () {
    console.log("port 9090 is live");
})