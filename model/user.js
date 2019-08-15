const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require("crypto")
const Schema = mongoose.Schema;

const uri = "mongodb://localhost:27017/cardsagainststupidity"
mongoose.Promise = global.Promise
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})



var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash: {
        type: String,
        required: true,
    },
    pinnedQuizzes: [{
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
    }],
    salt: {
        type: String,
        required: true
    }
})



userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.hash === hash;
};

userSchema.methods.setPassword = function (password) {
    // creating a unique salt for a particular user 
    this.salt = crypto.randomBytes(16).toString('hex')

    // hashing user's salt and password with 1000 iterations, 
    this.hash = crypto.pbkdf2Sync(password, this.salt,
        1000, 64, `sha512`).toString(`hex`);
}

userSchema.statics.createAccount = function (username, password, callback) {

    var user = new User({
        username,
        pinnedQuizzes: []
    })

    user.setPassword(password);

    // save newUser object to database 
    user.save(callback)
}

userSchema.statics.getUser = function (username, callback) {
    this.findOne({
        username
    }, callback)
}

userSchema.statics.getUsername = function (user_id, callback) {
    this.findOne({
        _id: user_id
    }, callback)


}


userSchema.statics.addQuizToPinned = function (user_id, quiz, callback) {
    this.updateOne({
        _id: user_id
    }, {
        $push: {
            pinnedQuizzes: quiz
        }
    }, callback)
}

userSchema.statics.removeQuizToPinned = function (user_id, quiz_id, callback) {

    this.updateOne({
        _id: user_id
    }, {
        $pull: {
            pinnedQuizzes: quiz_id
        }
    }, callback)

}


userSchema.statics.updatePassword = function (id, newpass, callback) {

    let newsalt = crypto.randomBytes(16).toString('hex')
    let newhash = crypto.pbkdf2Sync(newpass, newsalt,
        1000, 64, `sha512`).toString(`hex`)


    User.updateOne({
        _id: id
    }, {
        $set: {
            hash: newhash,
            salt: newsalt
        }
    }, callback)
}

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema, 'users')

module.exports = {
    User
}