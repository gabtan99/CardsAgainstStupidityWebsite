const mongoose = require("mongoose")

const {Flashcard} = require("./flashcard")

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
    deck: [{
        type: Schema.Types.ObjectId,
        ref: 'Flashcard'
    }]

})

// create a quiz
quizSchema.statics.createQuiz = function (title, author, subject, description, public, deck, callback) {
    Quiz.collection.insertOne({
        title,
        author,
        subject,
        description,
        public,
        deck
    })
}

// find a quiz
quizSchema.statics.findQuiz = function (title, author, subject, callback){
    Quiz.findMany({
        title, 
        author, 
        subject
    }, (err, doc)=>{
        if(err){
            console.log("ERROR! Quiz Not Found")
        } else {
            return doc
        }
    })
}

// edit a quiz
quizSchema.statics.updateQuiz = function(id, title, author, subject, description, public, callback){
    Quiz.updateOne({
        _id: id
    }, {
        title: title,
        author: author,
        subject: subject,
        description: description,
        public: public
    }, (err, doc)=>{
        if(err){
            console.log("ERROR! Edit Quiz Failed")
        }else{
            return doc
        }
    })
}

// delete a quiz
quizSchema.statics.deleteQuiz = function(id, callback){
    Quiz.deleteOne({
        _id: id
    }, (err, doc)=>{
        if(err){
            console.log("ERROR! Delete Quiz Failed")
            return false
        }else{
            return true
        }
    })
}

const Quiz = mongoose.model("Quiz", quizSchema, 'quizzes')

module.exports = {
    Quiz
}