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

// create a flashcard

flashcardSchema.statics.createFlashcard = function (question, answer, callback) {

    var flashcard = new Flashcard({
        question,
        answer
    })

    flashcard.save()
}

// create many flashcards

// find a flashcard
flashcardSchema.statics.findFlashCard = async (id, callback) => {
    return await Flashcard.findOne({
        _id: id
    })
}

// delete a flashcard
flashcardSchema.statics.deleteFlashCard = function(id, callback){
    Flashcard.deleteOne({
        _id: id
    }, (err, doc)=>{
        if(err){
            return false
        }else{
            //res.redirect("/users")
            console.log(doc)
            return true
        }
    })
}

// delete flashcards
flashcardSchema.statics.deleteFlashCards = function(id, callback){
    Flashcard.delete({
        _id: id
    }, (err, doc)=>{
        if(err){
            return false
        }else{
            //res.redirect("/users")
            console.log(doc)
            return true
        }
    })
}

// edit a flashcard
flashcardSchema.statics.editFlashCard = function(id){
    Flashcard.updateOne({
        _id: id
    }, {
        question: String,
        answer: String
    }, (err, doc)=>{
        if(err){
            return false
        }else{
            return doc
        }
    })
}
//d delete many flashcards


// ? update many flashcards

const Flashcard = mongoose.model("Flashcard", flashcardSchema, 'flashcards')

module.exports = {
    Flashcard
}