const mongoose = require("mongoose")


const uri = "mongodb://localhost:27017/cardsagainststupidity"
mongoose.Promise = global.Promise
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true
})

const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
    question: String,
    answer: String
})

const Flashcard = mongoose.model("Flashcard", flashcardSchema, 'flashcards')


// create a flashcard

// create many flashcards

// find a flashcard

// delete a flashcard

// edit a flashcard

//d delete many flashcards


// ? update many flashcards



module.exports = {
    Flashcard
}