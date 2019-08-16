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

const app = express()


app.use(cookieparser())
app.use(express.static(__dirname + '/public'));
app.set("view engine", "hbs")


app.use(session({
    resave: true,
    name: "CardsAgainstStupidity",
    saveUninitialized: true,
    secret: "secretpass",
    cookie: {
        maxAge: 60 * 60 * 1000 * 24
    }
}))

app.use('/user', require('./routes/userroute.js'));
app.use('/quiz', require('./routes/quizroute.js'));



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
    req.session.destroy((err) => {

    })
    res.redirect("/login")
})

app.post("/create-account", urlencoder, (req, res) => {
    let username = req.body.username
    let password = req.body.password

    User.createAccount(username, password, (err, doc) => {
        if (err) {
            res.send("Please select another username")
        } else {
            req.session.username = doc.username
            res.send("1")
            // new user created
        }
    })
})


app.post("/check-login", urlencoder, (req, res) => {

    let username = req.body.username
    let password = req.body.password


    User.getUser(username, (err, doc) => {
        if (doc === null) {
            res.send("Username does not exist")
        } else {
            if (doc.validPassword(password)) {
                req.session.username = doc.username
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

    User.getUser(username, (err, doc) => {
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

app.get("/search-keyword", urlencoder, async (req, res) => {

    var keyword = req.query.keyword
    let results = await Quiz.searchQuiz(keyword)

    User.getUser(req.session.username, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            if (doc == null) {
                res.send(results)
            } else {
                let response = {
                    user_id: doc._id,
                    pinned: doc.pinnedQuizzes,
                    quizzes: results
                }

                res.send(response)
            }
        }
    })
})

app.get("/get-five-quizzes-guest", async (req, res) => {
    let results = await Quiz.getFiveQuizzes()

    res.send(results)
})

app.get("/get-five-quizzes-user", async (req, res) => {

    let results = await Quiz.getFiveQuizzes()
    User.getUser(req.session.username, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            if (doc == null) {
                res.send(results)
            } else {
                let response = {
                    user_id: doc._id,
                    pinned: doc.pinnedQuizzes,
                    quizzes: results
                }
                res.send(response)
            }
        }
    })
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