$(document).ready(function () {

    $.ajax({
        url: "/get-five-quizzes-user",
        method: "GET",
        success: function (result) {
            emptyContainer()
            hideError("")
            renderResultUser(result)
        }
    })

    $('#SearchForm').submit(async function (e) {


        e.preventDefault()

        let keyword = $("#searchbox").val()

        if (keyword === '') {
            emptyContainer()
            displayError("Enter a keyword")
        } else {
            emptyContainer()
            hideError("")
            await $.ajax({
                url: "search-keyword",
                method: "GET",
                data: {
                    keyword: keyword
                },
                success: function (result) {
                    if (result.quizzes.length == 0) {
                        emptyContainer()
                        displayError("No Results Found")
                    } else {
                        emptyContainer()
                        hideError("")
                        renderResultUser(result)
                    }
                },
            })
        }
    })
})

function displayError(msg) {
    $("#error-messages").empty()
    let error = document.getElementById("error-div")
    error.className = "error-box shown"
    $("#error-messages").append('<li>' + msg + '</li')
    // shows the error message by appending the invisible list
}

function hideError(msg) {
    $("#error-messages").empty()
    let error = document.getElementById("error-div")
    error.className = "error-box tab"
    $("#error-messages").append('<li>' + msg + '</li')
    // shows the error message by appending the invisible list
}

function emptyContainer() {
    $("#searchResultContainer").empty()
}

function displayResultUser(dataID, stringTitle, stringSubject, stringDescrip, nCards, stringAuthor, actionType) {
    //UPPER
    const resultContainer = document.createElement("div")
    resultContainer.className = "searchResult"

    const upperPartResultContainer = document.createElement("div")
    upperPartResultContainer.id = "topResult"

    const title = document.createElement("div")
    title.className = "searchResultTitle"
    title.innerHTML = stringTitle

    const subject = document.createElement("div")
    subject.className = "searchResultUpInfo"
    subject.innerHTML = stringSubject

    const description = document.createElement("div")
    description.className = "searchResultUpInfo"
    description.innerHTML = stringDescrip

    upperPartResultContainer.append(title)
    upperPartResultContainer.append(subject)
    upperPartResultContainer.append(description)

    //BOTTOM
    const lowerPartResultContainer = document.createElement("div")
    lowerPartResultContainer.id = "botResult"

    //BOT INFO
    const numFlashCardsAndCreatorContainer = document.createElement("div")
    numFlashCardsAndCreatorContainer.id = "botInfo"

    const privacyType = document.createElement("div")
    privacyType.className = "searchResultUpInfo"

    const numFlashCards = document.createElement("div")
    numFlashCards.className = "searchResultUpInfo searchResultDownInfo"
    numFlashCards.innerHTML = nCards + " Flashcards"

    const creator = document.createElement("div")
    creator.className = "searchResultUpInfo"
    creator.innerHTML = "Made by " + stringAuthor

    numFlashCardsAndCreatorContainer.append(privacyType)
    numFlashCardsAndCreatorContainer.append(numFlashCards)
    numFlashCardsAndCreatorContainer.append(creator)

    //BUTTONS
    const buttonsContainer = document.createElement("div")
    buttonsContainer.id = "buttonsResult"

    const pinButton = document.createElement("a")
    const pinImage = document.createElement("img")
    const pinTag = document.createElement("div")

    pinButton.id = "pinBtn"
    pinButton.setAttribute('data-id', dataID)
    pinButton.className = "searchResult-Btns pinButton"

    pinImage.id = "pinIcon"
    pinImage.src = "../assets/pin.png"
    pinImage.className = "pinIconPos"

    pinTag.id = "tagPin"

    switch(actionType){
        case "pin":
            pinButton.append(pinImage)
            pinTag.innerHTML = "Pin Quiz"
        break;
        case "unpin":
            pinButton.append(pinImage)
            pinTag.innerHTML = "Unpin"
        break;
        case "edit":
            pinTag.innerHTML = "Edit"
        break;
    }

    pinButton.append(pinTag)

    const nextLine = document.createElement("br")

    const takeQuizButton = document.createElement("a")
    takeQuizButton.setAttribute('data-id', dataID)
    takeQuizButton.className = "searchResult-Btns takeButton"
    takeQuizButton.innerHTML = "Take Quiz"

    buttonsContainer.append(pinButton)
    buttonsContainer.append(nextLine)
    buttonsContainer.append(takeQuizButton)

    lowerPartResultContainer.append(numFlashCardsAndCreatorContainer)
    lowerPartResultContainer.append(buttonsContainer)

    resultContainer.append(upperPartResultContainer)
    resultContainer.append(lowerPartResultContainer)

    $('#searchResultContainer').prepend(resultContainer)


    $("a.takeButton").click(function () {
        $("#takeid").val($(this).attr("data-id"))
        $("#hiddenTakeForm").submit()
    })

    $("#pinBtn").click(async function (e) {
        e.preventDefault()
        if ($(this).find("#tagPin").html() == "Pin Quiz") {
            pinQuiz(this)
        } else if ($(this).find("#tagPin").html() == "Unpin") {
            unpinQuiz(this)
        } else if ($(this).find("#tagPin").html() == "Edit") {
            $("#editid").val($(this).attr("data-id"))
            $("#hiddenEditForm").submit()
        } else {
            alert("None!")
        }
    })
}

async function pinQuiz(button) {
    await $.ajax({
        url: "/quiz/pin_quiz",
        method: "GET",
        data: {
            id: $(button).attr("data-id")
        },
        success: function (result) {
            if (result == '1') {
                $(button).find("#tagPin").html("Unpin")
            }
        },
    })
}

async function unpinQuiz(button) {
    await $.ajax({
        url: "/quiz/unpin_quiz",
        method: "GET",
        data: {
            id: $(button).attr("data-id")
        },
        success: function (result) {
            if (result == '1') {
                $(button).find("#tagPin").html("Pin Quiz")
            }
        },
    })
}

async function renderResultUser(result) {

    for (var i = 0; i < result.quizzes.length; i++) {

        let isPinned = false

        for (var j = 0; j < result.pinned.length; j++) {
            if (result.quizzes[i]._id == result.pinned) {
                isPinned = true
                break;
            }
        }

        if (result.quizzes[i].author._id == result.user_id) {
            displayResultUser(result.quizzes[i]._id, result.quizzes[i].title, result.quizzes[i].subject,
                result.quizzes[i].description, result.quizzes[i].deck.length, result.quizzes[i].author.username, "edit")
        } else {
            if (isPinned) {
                displayResultUser(result.quizzes[i]._id, result.quizzes[i].title, result.quizzes[i].subject,
                    result.quizzes[i].description, result.quizzes[i].deck.length, result.quizzes[i].author.username, "unpin")
            } else {
                displayResultUser(result.quizzes[i]._id, result.quizzes[i].title, result.quizzes[i].subject,
                    result.quizzes[i].description, result.quizzes[i].deck.length, result.quizzes[i].author.username, "pin")
            }
        }
    }
}