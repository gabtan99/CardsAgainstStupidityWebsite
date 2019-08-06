const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
    question: String,
    answer: String
})


flashcardSchema.statics.createFlashcard = function (quiz_id, question, answer, callback) {

    var flashcard = new Flashcard({
        quiz_id,
        question,
        answer
    })

    flashcard.save(callback)
}

flashcardSchema.statics.findFlashCard = async (id, callback) => {

}

flashcardSchema.statics.deleteOneFlashCard = function (id, callback) {
    Flashcard.deleteOne({
        _id: id
    }, callback)
}

flashcardSchema.statics.deleteFlashCards = function (id, callback) {
    Flashcard.delete({
        _id: id
    }, callback)
}

flashcardSchema.statics.editFlashCard = function (id, question, answer, callback) {
    Flashcard.updateOne({
        _id: id
    }, {
        question,
        answer
    }, callback)
}

const Flashcard = mongoose.model("Flashcard", flashcardSchema)

module.exports = {
    Flashcard
}