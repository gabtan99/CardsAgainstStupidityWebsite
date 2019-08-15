var currentTab

$(document).ready(function () {
    currentTab = 0;
    showTab(currentTab)

    $("#createForm").submit(function (e) {

        e.preventDefault()


        // quiz details
        var title = $("#titlebox").val()
        var subject = $("#subjectbox").val()
        var description = $("#descripbox").val()
        var deck = createFlashcardCollection()
        var public

        if ($('input[name=privacy]:checked').val()) {
            public = true;
        } else {
            public = false;
        }

        $.ajax({
            url: "/quiz/submit_new_quiz",
            method: "GET",
            contentType: 'application/json',
            data: {
                title: title,
                subject: subject,
                description: description,
                deck: deck,
                public: public
            },
            success: function (result) {

                if (result == "1") {
                    window.location = "/quiz/"
                }

            },
        })

    })

})

function createFlashcardCollection() {
    var cards = []
    $(".card-element").each(function () {
        var question = $(this).children(".cards").children(".black-card").children("textarea").val()
        var answer = $(this).children(".cards").children(".white-card").children("textarea").val()
        var flashCard = {
            "Question": question,
            "Answer": answer
        }

        cards.push(flashCard)
    })

    return cards
}

function showTab(n) {

    var tabs = $(".tab")

    tabs[n].style.display = "block"

    if (n == 0) {
        document.getElementById("back-nav").style.display = "none"
    } else {
        document.getElementById("back-nav").style.display = "inline"
    }

    if (n == 2) {
        document.getElementById("nextBtn").style.display = "none"
    } else {
        document.getElementById("nextBtn").style.display = "flex"
    }

    fixStepIndicator(n)
}


function nextPrev(n) {
    var tabs = $(".tab")

    tabs[currentTab].style.display = "none"

    if(checkInputs(currentTab)){
        currentTab = currentTab + n
    }
    showTab(currentTab)
}

function fixStepIndicator(n) {

    var ind = $(".circle")

    for (var i = 0; i < ind.length; i++) {
        ind[i].className = "circle statustext"
    }

    ind[n].className = "circle statustext selected"
}

function checkInputs(currentTab){
    if(currentTab == 0){
        let title = $("#titlebox").val()
        let subject = $("#subjectbox").val()
        let description = $("#descripbox").val()

        if(title == '' || subject == '' || description == ''){
            displayError("Pleas fill out all the requirements")
            return false
        }

        return true
    }else if(currentTab == 1){
        if(checkNumberOfCards() == 0){
            displayError("You should have at least one flash card")
            return false
        }
        return true
    }
}

function displayError(msg) {
    $("#error-messages").empty()
    let error = document.getElementById("error-div")
    error.className += "shown"
    $("#error-messages").append('<li>' + msg + '</li')
    // shows the error message by appending the invisible list
}

function checkNumberOfCards() {
    counter = 0
    $(".card-element").each(function () {
        counter++
    })
    return counter
}