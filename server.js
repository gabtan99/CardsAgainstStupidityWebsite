const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express()


const {
    User
} = require("./js/user.js")


mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true
})

// url encoder
const urlencoder = bodyparser.urlencoded({
    extended: false
});


app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home-guest.html")
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/public/registration.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html")
})

app.get("/create_quiz", (req, res)=>{
    res.sendFile(__dirname + "/public/create-quiz.html")
})

app.get("/add_card", (req, res)=>{
    res.sendFile(__dirname + "/public/add-card.html")
})


app.post("/createAccount", urlencoder, (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var confirm = req.body.confirm

    let user = new User({
        username,
        password
    })

    if (confirm == password) {
        user.save().then((doc) => {
            console.log(doc)
            res.redirect("/")
        }, (err) => {
            res.send(err)
        })
    } else {
        console.log("pass do not match")
    }


})



app.listen(9090, function () {
    console.log("port 9090 is live");
});