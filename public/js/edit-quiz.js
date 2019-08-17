$(document).ready(function () {

    $("#deleteBtn").click(function () {
        showDeleteForm()
    })

    $("#cancelBtn").click(function () {
        hideDeleteForm()
    })

    $("#confirmBtn").click(function () {
        $("#deleteid").val($(this).attr("data-id"))
        $("#deleteform").submit()
    })

    $("button#save-button").click(function () {
        var id = $("#Form").attr("data-id")
        var title = $("#titlebox").val()
        var subject = $("#subjectbox").val()
        var description = $("#descripbox").val()
        var deck = createFlashcardCollection()
        if ($("#public:checked").val()) {
            var public = true
        } else {
            var public = false
        }

        if (title == '' || subject == '' || description == '' || deck == null) {
            displayError("Please fill out all the contents")
        } else {
            $.ajax({
                url: "/quiz/update_quiz",
                method: "GET",
                contentType: 'application/json',
                data: {
                    id: id,
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
        }


    })
    counter = checkNumberOfCards()
    checkCardLabels(counter)
    addRemoveCardListeners()

    if ($("#public").val() == "true") {
        $("#private").prop("checked", false)
        $("#public").prop("checked", true)
    } else {
        $("#public").prop("checked", false)
        $("#private").prop("checked", true)
    }

    $('.add-card a').click(function () {
        createCard()
        return false;
    })

    function createCard() {
        counter++
        const cardElementDiv = document.createElement("div")
        cardElementDiv.className = "card-element"

        const cardHeaderDiv = document.createElement("div")
        cardHeaderDiv.className = "card-header"

        const removeCard = document.createElement("a")
        removeCard.id = "remove-card"

        const crossIcon = document.createElement("div")
        crossIcon.id = "cross-icon"
        crossIcon.innerHTML = "+"

        const cardLabel = document.createElement("div")
        cardLabel.id = "card-label"
        cardLabel.innerHTML = "Flashcard " + counter

        const cardsDiv = document.createElement('div')
        cardsDiv.className = "cards"

        // cards
        const blackCardDiv = document.createElement('div')
        blackCardDiv.className = "black-card"

        const whiteCardDiv = document.createElement('div')
        whiteCardDiv.className = 'white-card'

        const textAreaBlack = document.createElement("textarea")
        textAreaBlack.placeholder = "Enter Question Here"

        const textAreaWhite = document.createElement('textarea')
        textAreaWhite.placeholder = "Enter Answer Here"

        const footerBlack = document.createElement('footer')
        const parBlack = document.createElement('p')
        parBlack.innerHTML = "Cards Against Stupidity"

        const footerWhite = document.createElement('footer')
        const parWhite = document.createElement('p')
        parWhite.innerHTML = "Cards Against Stupidity"
        ///////////////




        footerBlack.append(parBlack)
        footerWhite.append(parWhite)
        blackCardDiv.append(textAreaBlack)
        blackCardDiv.append(footerBlack)


        whiteCardDiv.append(textAreaWhite)
        whiteCardDiv.append(footerWhite)
        cardsDiv.append(blackCardDiv)
        cardsDiv.append(whiteCardDiv)

        removeCard.append(crossIcon)
        cardHeaderDiv.append(removeCard)
        cardHeaderDiv.append(cardLabel)

        cardElementDiv.append(cardHeaderDiv)
        cardElementDiv.append(cardsDiv)

        $('#card-container').prepend(cardElementDiv)

        removeCard.onclick = function () {
            if (checkNumberOfCards() == 1) {
                displayError("A quiz must contain at least one flashcard")
                return false
            } else {
                cardElementDiv.remove()
                counter--
                checkCardLabels(counter)
                return false
            }
        }
    }

    function checkCardLabels(counter) {
        counterTemp = counter
        $(".card-element").each(function () {
            $(this).children(".card-header").children("#card-label").html("Flashcard " + counterTemp)
            counterTemp--
        })
    }

    function checkNumberOfCards() {
        counter = 0
        $(".card-element").each(function () {
            counter++
        })
        return counter
    }

    function addRemoveCardListeners() {
        $(".card-element").each(function () {
            $(this).children(".card-header").children("#remove-card").click(function () {
                if (checkNumberOfCards() == 1) {
                    displayError("A quiz must contain at least one flashcard")
                    return false
                } else {
                    $(this).parent().parent().remove()
                    counter--
                    checkCardLabels(counter)
                    return false
                }
            })
        })
    }

    function createFlashcardCollection() {
        var cards = []
        $(".card-element").each(function () {
            var question = $(this).children(".cards").children(".black-card").children("textarea").val()
            var answer = $(this).children(".cards").children(".white-card").children("textarea").val()

            if ($.trim(question).length == 0 || $.trim(answer).length == 0) {
                cards = null
            } else {
                var flashCard = {
                    "Question": question,
                    "Answer": answer
                }

                cards.push(flashCard)
            }
        })

        return cards
    }

    $("#takeQuizBtn").click(function () {
        $("#takeid").val($(this).attr("data-id"))
        $("#takeform").submit()
    })


    function displayError(msg) {
        $("#error-messages").empty()
        let error = document.getElementById("error-div")
        error.className += "shown"
        $("#error-messages").append('<li>' + msg + '</li')
        // shows the error message by appending the invisible list
    }

    function showDeleteForm() {
        document.getElementById("mainbodyid").style.display = "none"
        document.getElementById("deleteformid").style.display = "flex"
    }

    function hideDeleteForm() {
        document.getElementById("mainbodyid").style.display = "flex"
        document.getElementById("deleteformid").style.display = "none"
    }
})