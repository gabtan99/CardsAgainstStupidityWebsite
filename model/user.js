const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const crypto = require("crypto")

const uri = "mongodb://localhost:27017/cardsagainststupidity"
mongoose.Promise = global.Promise
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

const Schema = mongoose.Schema;

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
    salt: String
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

userSchema.statics.createAccount = function (username, password, res, callback) {

    var user = new User({
        username,
        pinnedQuizzes: []
    })

    user.setPassword(password);

    // save newUser object to database 
    user.save((err, doc) => {
        if (err) {
            return res.status(400).send({
                message: "Failed to add user."
            });
        } else {
            return res.status(201).send({
                message: "User added succesfully."
            });
        }
    });

}

userSchema.statics.getAccount = async (username, password, callback) => {
    return await User.findOne({
        username,
        password
    })
}

userSchema.statics.loginUser = function (username, password, res, callback) {
    // find user with requested email 
    User.findOne({
        username
    }, (err, doc) => {
        if (doc === null) {
            return res.status(400).send({
                message: "User not found."
            });
        } else {
            if (doc.validPassword(password)) {

                console.log(doc)

                return res.status(201).send({
                    message: "User Logged In",
                })

            } else {
                return res.status(400).send({
                    message: "Wrong Password"
                });
            }
        }
    });
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

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema, 'users')

module.exports = {
    User
}