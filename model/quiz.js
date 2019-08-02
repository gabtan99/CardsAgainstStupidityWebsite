const mongoose = require("mongoose")

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


const Quiz = mongoose.model("Quiz", quizSchema)



// create a quiz

// find a quiz

// edit a quiz

// delete a quiz



module.exports = {
    Quiz
}