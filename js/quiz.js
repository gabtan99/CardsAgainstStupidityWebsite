const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title: String,
    author: Number,
    subject: String,
    description: String,
    public: Boolean,
    deck: [{
        type: Schema.Types.ObjectId,
        ref: 'Flashcard'
    }]

})


const Quiz = mongoose.model("Quiz", quizSchema)

module.exports = {
    Quiz
}