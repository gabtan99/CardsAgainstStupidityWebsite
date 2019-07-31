const express = require("express")
const bodyparser = require("body-parser")
const hbs = require("hbs")
const session = require("express-session")
const cookieparser = require("cookie-parser")
const mongoose = require("mongoose")
const app = express()

// url encoder
const urlencoder = bodyparser.urlencoded({
    extended: false
});


app.get



app.listen(9090, function () {
    console.log("port 9090 is live");
});