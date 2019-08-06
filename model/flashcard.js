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


flashcardSchema.statics.createFlashcard = function (quiz_id, question, answer, callback) {

    var flashcard = new Flashcard({
        quiz_id,
        question,
        answer
    })

    flashcard.save()
}

flashcardSchema.statics.findFlashCard = async (id, callback) => {
    return await Flashcard.findOne({
        _id: id
    })
}

flashcardSchema.statics.deleteOneFlashCard = function (id, callback) {
    Flashcard.deleteOne({
        _id: id
    }, (err, doc) => {
        if (err) {
            return false
        } else {
            //res.redirect("/users")
            console.log(doc)
            return true
        }
    })
}

flashcardSchema.statics.deleteFlashCards = function (id, callback) {
    Flashcard.delete({
        _id: id
    }, (err, doc) => {
        if (err) {
            return false
        } else {
            //res.redirect("/users")
            console.log(doc)
            return true
        }
    })
}

flashcardSchema.statics.editFlashCard = function (id, question, answer) {
    Flashcard.updateOne({
        _id: id
    }, {
        question,
        answer
    }, (err, doc) => {
        if (err) {
            return false
        } else {
            return doc
        }
    })
}

const Flashcard = mongoose.model("Flashcard", flashcardSchema, 'flashcards')

module.exports = {
    Flashcard
}