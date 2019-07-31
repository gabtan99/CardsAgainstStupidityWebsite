const mongoose = require("mongoose")

var User = mongoose.model("user", {
    name: String,
    username: String,
    password: String,
})

module.exports = {
    User
}