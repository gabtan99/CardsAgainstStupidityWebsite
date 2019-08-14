let score = 0
let timerCount
let qtitle
let qauthor
let qsubject
let qdescription
let qpublic
let qdeck

$(document).ready(function () {

    let quiz_id = "5d53c7fdae4bd73948a26620"

    $.ajax({
        url: "/quiz/retrieve_quiz",
        method: "GET",
        data: {
            qid: quiz_id
        },
        success: function (result) {
            if (result == "0") {
                console.log("Quiz not found")
            } else {
                qtitle = result.title
                qsubject = result.subject
                qdescription = result.description
                qpublic = result.public
                qdeck = result.deck
                qauthor = result.author
                showPrestart()
            }
        },
    })




    $('#takeQuizForm').submit(function (e) {
        e.preventDefault()

        timerCount = $("#timerCount").val()

        showMainQuiz()
        addKeyboardFunction()

        console.log("start")
    })
})


function showMainQuiz() {
    hideAll()
    document.getElementById("mainQuizContainer").style.display = "block"
}

function showPrestart() {
    hideAll()
    document.getElementById("preStartContainer").style.display = "block"

    $("#qTitle").text(qtitle)
    $("#qSubject").text(qsubject)
    $("#qDescription").text(qdescription)
    $("#qNumberFlashcards").text(qdeck.length + " Flashcards")
    $("#qAuthor").text("By " + qauthor.username)

}

function hideAll() {
    document.getElementById("preStartContainer").style.display = "none"
    document.getElementById("mainQuizContainer").style.display = "none"
}


function addKeyboardFunction() {
    document.addEventListener('keyup', function (event) {
        if (event.defaultPrevented) {
            return;
        }

        var key = event.key || event.keyCode;

        if (key === 'K' || key === 'k' || key === 'd') {
            knewAnswer();
        } else if (key === 'G' || key === 'g' || key === 'a') {
            guessedAnswer();
        }
    });
}

function knewAnswer() {
    score++
    console.log("i knew it")
}

function guessedAnswer() {
    console.log("i guessed")
}