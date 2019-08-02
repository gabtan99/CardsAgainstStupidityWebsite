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
flashcardSchema.statics.createFlashCard = function(question, answer){
    Flashcard.collection.insertOne({
        question,
        answer
    })
}
// create many flashcards

// find a flashcard

// delete a flashcard
flashcardSchema.statics.deleteFlashCard = function(id){
    console.log("POST /delete " + req.body.id)
    Flashcard.deleteOne({
        _id: id
    }, (err, doc)=>{
        if(err){
            res.send(err)
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