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

quizSchema.statics.createQuiz = function (title, author, subject, description, public, deck, callback) {

    var quiz = new Quiz({
        title,
        author,
        subject,
        description,
        public,
        deck
    })

    quiz.save(callback)
}

quizSchema.statics.findQuiz = async function (id, callback) {

}

quizSchema.statics.findQuizzes = async function (id, callback) {

}


quizSchema.statics.searchQuiz = function (keyword, callback) {

    Quiz.find({
        '$or': [{
                title: {
                    $regex: keyword,
                    $options: "$i"
                }
            },
            {
                subject: {
                    $regex: keyword,
                    $options: "$i"
                }
            }, {
                description: {
                    $regex: keyword,
                    $options: "$i"
                }
            }
        ]


    }, callback)

}


quizSchema.statics.updateQuiz = function (id, title, author, subject, description, public, callback) {
    Quiz.updateOne({
        _id: id
    }, {
        title: title,
        author: author,
        subject: subject,
        description: description,
        public: public
    }, callback)
}

quizSchema.statics.deleteQuiz = function (id, callback) {
    Quiz.deleteOne({
        _id: id
    }, callback)
}

quizSchema.statics.addFlashcardToDeck = function (flashcard_id, quiz_id, callback) {
    Quiz.updateOne({
        _id: quiz_id
    }, {
        $push: {
            deck: flashcard_id
        }
    }, callback)
}

const Quiz = mongoose.model("Quiz", quizSchema, 'quizzes')

module.exports = {
    Quiz
}