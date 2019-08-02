const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
    question: String,
    answer: String
})

const Flashcard = mongoose.model("Flashcard", flashcardSchema)



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