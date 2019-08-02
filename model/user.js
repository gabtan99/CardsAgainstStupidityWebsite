const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

const uri = "mongodb://localhost:27017/cardsagainststupidity"
mongoose.Promise = global.Promise
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

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

userSchema.statics.createAccount = function (name, username, password, callback) {

    var user = new User({
        name,
        username,
        password,
        pinnedQuizzes: []
    })


    user.save()
}

userSchema.statics.getAccount = async (username, password, callback) => {
    return await User.findOne({
        username,
        password
    })
}

userSchema.statics.addQuizToPinned = function (quiz_id, user_id, callback) {
    User.updateOne({
        _id: user_id
    }, {
        $push: {
            pinnedQuizzes: quiz_id
        }
    }, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            console.log("pinned quiz")
        }
    })
}


userSchema.statics.updateUser = function (id, name, username, password, callback) {
    User.updateOne({
        _id: id
    }, {
        name: name,
        username: username,
        password: password
    }, (err, doc) => {
        if (err) {
            return false
        } else {
            return doc
        }
    })
}

const User = mongoose.model("User", userSchema, 'users')

module.exports = {
    User
}