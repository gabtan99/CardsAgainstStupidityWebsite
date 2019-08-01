const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    pinnedQuizzes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }]
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}