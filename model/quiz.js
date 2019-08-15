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
    deck: Array
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

quizSchema.statics.findQuizzes = async function (author) {
    return await this.find({
        author: author
    }).populate("author", "username")
}

quizSchema.statics.retrieveQuiz = async function (quiz_id, callback) {
    return await this.findOne({
        _id: quiz_id
    }).populate("author", "username")
}

quizSchema.statics.searchQuiz = async function (keyword, callback) {

    return await this.find({
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
        ],
        public: true


    }).populate("author", "username")

}

quizSchema.statics.getFiveQuizzes = function (callback) {
    this.find({
        public: true
    }, callback).limit(5).populate("author", "username")
}


quizSchema.statics.updateQuiz = function (id, title, author, subject, description, public, deck, callback) {
    this.updateOne({
        _id: id
    }, {
        title: title,
        author: author,
        subject: subject,
        description: description,
        public: public,
        deck: deck
    }, callback)
}

quizSchema.statics.deleteQuiz = function (id, callback) {
    this.deleteOne({
        _id: id
    }, callback)
}

quizSchema.statics.addFlashcardToDeck = function (flashcard_id, quiz_id, callback) {
    this.updateOne({
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