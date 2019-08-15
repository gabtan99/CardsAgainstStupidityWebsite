let user_id

$(document).ready(function () {
    $('#SearchForm').submit(async function (e) {

        var isGuest = true

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
                        user_id = result.user_id
                        emptyContainer()
                        hideError("")
                        renderResultUser(result)
                        addFunctionality()
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

    const numFlashCards = document.createElement("div")
    numFlashCards.className = "searchResultUpInfo searchResultDownInfo"
    numFlashCards.innerHTML = nCards + " Flashcards"

    const creator = document.createElement("div")
    creator.className = "searchResultUpInfo"
    creator.innerHTML = "Made by " + stringAuthor

    numFlashCardsAndCreatorContainer.append(numFlashCards)
    numFlashCardsAndCreatorContainer.append(creator)

    //BUTTONS
    const buttonsContainer = document.createElement("div")
    buttonsContainer.id = "buttonsResult"



    const nextLine = document.createElement("br")

    const takeQuizButton = document.createElement("a")
    takeQuizButton.className = "searchResult-Btns"
    takeQuizButton.href = "/quiz/take_quiz"

    takeQuizButton.innerHTML = "Take Quiz"




    const hiddenForm = document.createElement("form")
    hiddenForm.action = "/quiz/pin_quiz"
    hiddenForm.id = "hidden"




    buttonsContainer.append(nextLine)
    buttonsContainer.append(takeQuizButton)

    lowerPartResultContainer.append(numFlashCardsAndCreatorContainer)
    lowerPartResultContainer.append(buttonsContainer)

    resultContainer.append(upperPartResultContainer)
    resultContainer.append(lowerPartResultContainer)

    $('#searchResultContainer').prepend(resultContainer)

    switch (actionType) {
        case "pin":
            addFunctionality(dataID, buttonsContainer, actionType)
            $("button.pinButton").click(function () {
                $("pinid").val($(this).attr("data-id"))
                $("#hiddenPinForm").submit()
            })
            break;
        case "unpin":
            addFunctionality(dataID, buttonsContainer, actionType)
            $("button.pinButton").click(function () {
                $("unpinid").val($(this).attr("data-id"))
                $("#hiddenUnpinForm").submit()
            })
            break;

        case "edit":
            addFunctionality(dataID, buttonsContainer, actionType)
            $("button.pinButton").click(function () {
                $("editid").val($(this).attr("data-id"))
                $("#hiddenEditForm").submit()
            })
            break;
    }

}


function renderResultUser(result) {

    for (var i = 0; i < result.quizzes.length; i++) {

        if (result.quizzes[i].author._id == result.user_id) {
            displayResultUser(result.quizzes[i]._id, result.quizzes[i].title, result.quizzes[i].subject,
                result.quizzes[i].description, result.quizzes[i].deck.length, result.quizzes[i].author.username, "edit")
        } else {

            displayResultUser(result.quizzes[i]._id, result.quizzes[i].title, result.quizzes[i].subject,
                result.quizzes[i].description, result.quizzes[i].deck.length, result.quizzes[i].author.username, "pin")

            result.pinned.forEach(function (item) {
                if (item._id == result.quizzes[i]._id) {
                    displayResultUser(result.quizzes[i]._id, result.quizzes[i].title, result.quizzes[i].subject,
                        result.quizzes[i].description, result.quizzes[i].deck.length, result.quizzes[i].author.username, "unpin")
                    break;
                }
            })
        }
    }


}


function addFunctionality(dataID, container, actionType) {

    const pinButton = document.createElement("button")
    const pinImage = document.createElement("img")
    const pinTag = document.createElement("div")

    switch (actionType) {
        case "pin":

            pinButton.id = "pinBtn"
            pinButton.setAttribute('data-id', dataID)
            pinButton.className = "searchResult-Btns pinButton"



            pinImage.id = "pinIcon"
            pinImage.src = "../assets/pin.png"
            pinImage.className = "pinIconPos"

            pinButton.append(pinImage)

            pinTag.innerHTML = "Pin Quiz"

            pinButton.append(pinTag)
            container.prepend(pinButton)

            break;

        case "unpin":
            pinButton.id = "pinBtn"
            pinButton.setAttribute('data-id', dataID)
            pinButton.className = "searchResult-Btns pinButton"


            pinImage.id = "pinIcon"
            pinImage.src = "../assets/pin.png"
            pinImage.className = "pinIconPos"

            pinButton.append(pinImage)

            pinTag.innerHTML = "Unpin"

            pinButton.append(pinTag)
            container.prepend(pinButton)

            break;

        case "edit":
            pinButton.id = "pinBtn"
            pinButton.setAttribute('data-id', dataID)
            pinButton.className = "searchResult-Btns pinButton"


            pinTag.innerHTML = "Edit"

            pinButton.append(pinTag)
            container.prepend(pinButton)
            break;
    }
}