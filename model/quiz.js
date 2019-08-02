const mongoose = require("mongoose")

const uri = "mongodb://localhost:27017/cardsagainststupidity"
mongoose.Promise = global.Promise
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subject: String,
    description: String,
    public: Boolean,
    deck: [{
        type: Schema.Types.ObjectId,
        ref: 'Flashcard'
    }]

})

// create a quiz
quizSchema.statics.createQuiz = function (title, author, subject, description, public, deck, callback) {

    var quiz = new Quiz({
        title,
        author,
        subject,
        description,
        public,
        deck
    })

    quiz.save()
}

// find a quiz
quizSchema.statics.findQuiz = async function (id, callback) {
    return await Quiz.findOne({
        _id: id
    })
}

//find quizzes
quizSchema.statics.findQuizzes = async function (id, callback) {
    return await Quiz.find({
        _id: id
    })
}

// search a quiz
quizSchema.statics.searchQuiz = async function (keyword, callback) {
    return await Quiz.find({
        title: {
            $regex: keyword,
            $options: "$i"
        }
    })
}

// edit a quiz
quizSchema.statics.updateQuiz = function (id, title, author, subject, description, public, callback) {
    Quiz.updateOne({
        _id: id
    }, {
        title: title,
        author: author,
        subject: subject,
        description: description,
        public: public
    }, (err, doc) => {
        if (err) {
            console.log("ERROR! Edit Quiz Failed")
        } else {
            return doc
        }
    })
}

// delete a quiz
quizSchema.statics.deleteQuiz = function (id, callback) {
    Quiz.deleteOne({
        _id: id
    }, (err, doc) => {
        if (err) {
            console.log("ERROR! Delete Quiz Failed")
            return false
        } else {
            return true
        }
    })
}

const Quiz = mongoose.model("Quiz", quizSchema, 'quizzes')

module.exports = {
    Quiz
}