const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cookieparser = require("cookie-parser")

// url encoder
const urlencoder = bodyparser.urlencoded({
    extended: false
});

const {
    User
} = require("./model/user.js")

const {
    Quiz
} = require("./model/quiz.js")

const {
    Flashcard
} = require("./model/flashcard.js")



const app = express()



app.use('/user', require('./routes/userroute.js'));
app.use('/quiz', require('./routes/quizroute.js'));

app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs")






//////// GUEST STATIC ROUTES ///////////

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home-guest.html")
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/user-registration.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/user-login.html")
})

app.get("/about-guest", (req, res) => {
    res.sendFile(__dirname + "/public/about-guest.html")
})

app.get("/search-guest", (req, res) => {
    res.sendFile(__dirname + "/public/search-guest.html")
})



//////////// LOGGED-IN USER ROUTES ////////////////

app.get("/logout", (req, res) => {
    res.sendFile(__dirname + "/public/user-login.html")
})

app.post("/create-account", urlencoder, (req, res) => {
    let username = req.body.username
    let password = req.body.password

    User.createAccount(username, password, (err, doc) => {
        if (err) {
            res.send("Please select another username")
        } else {
            res.send("1")
            // new user created
        }
    })
})


app.post("/check-login", urlencoder, (req, res) => {

    let username = req.body.username
    let password = req.body.password


    User.loginUser(username, password, (err, doc) => {
        if (doc === null) {
            res.send("Username does not exist")
        } else {
            if (doc.validPassword(password)) {
                res.send("1")
                // user is logged in
            } else {
                res.send("Username / Password does not match")
            }
        }
    })
})

app.post("/check-username", urlencoder, (req, res) => {

    let username = req.body.username

    User.checkIfUsernameTaken(username, (err, doc) => {
        if (doc === null) {
            res.send("1")
        } else {
            res.send("0")
        }
    })
})


app.get("/home", (req, res) => {
    res.render("home-user.hbs")
})

app.get("/search", (req, res) => {
    res.render("search.hbs")
})

app.get("/search-keyword", urlencoder, (req, res) => {

    var keyword = req.query.keyword


    var result = {
        "results": {
            "DzgvcDDm2I": {
                "title": "Midterms",
                "subject": "AUTOMAT",
                "description": "Chapter 1-5",
                "nFlashcards": 15,
                "author": "Denzel Co"
            },

            "WD2dqvcdaa": {
                "title": "Final Exam",
                "subject": "INTR-OS",
                "description": "Cover to cover coverage",
                "nFlashcards": 20,
                "author": "Denzel Lo"
            },

            "qweqdlw22a": {
                "title": "Fun",
                "subject": "WEBAPDE",
                "description": "Web Trivia",
                "nFlashcards": 5,
                "author": "Denzel Ho"
            }
        }
    }

})

app.get("/about", (req, res) => {
    res.render("about.hbs")
})

app.listen(3000, function () {
    console.log("port 3000 is live");
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