const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
    question: String,
    answer: String
})

const Flashcard = mongoose.model("Flashcard", flashcardSchema)

module.exports = {
    Flashcard
}