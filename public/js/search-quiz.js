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
                    if (result.length == 0) {
                        emptyContainer()
                        displayError("No Results Found")
                    } else {
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

function displayResultUserPin(dataID, stringTitle, stringSubject, stringDescrip, nCards, stringAuthor) {
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

    const pinButton = document.createElement("a")
    pinButton.id = "pinBtn"
    pinButton.setAttribute('data-id', dataID)
    pinButton.className = "searchResult-Btns pinButton"

    const pinImage = document.createElement("img")
    pinImage.id = "pinIcon"
    pinImage.src = "../assets/pin.png"
    pinImage.className = "pinIconPos"

    pinButton.append(pinImage)

    const pinTag = document.createElement("div")
    pinTag.innerHTML = "Pin Quiz"

    pinButton.append(pinTag)

    const nextLine = document.createElement("br")

    const takeQuizButton = document.createElement("a")
    takeQuizButton.className = "searchResult-Btns"
    takeQuizButton.href = "/quiz/take_quiz"

    takeQuizButton.innerHTML = "Take Quiz"

    buttonsContainer.append(pinButton)
    buttonsContainer.append(nextLine)
    buttonsContainer.append(takeQuizButton)

    lowerPartResultContainer.append(numFlashCardsAndCreatorContainer)
    lowerPartResultContainer.append(buttonsContainer)

    resultContainer.append(upperPartResultContainer)
    resultContainer.append(lowerPartResultContainer)

    $('#searchResultContainer').prepend(resultContainer)
}

function displayResultUserEdit(dataID, stringTitle, stringSubject, stringDescrip, nCards, stringAuthor) {
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

    const pinButton = document.createElement("a")
    pinButton.id = "pinBtn"
    pinButton.setAttribute('data-id', dataID)
    pinButton.className = "searchResult-Btns pinButton"

    // const pinImage = document.createElement("img")
    // pinImage.id = "pinIcon"
    // pinImage.src = "../assets/pin.png"
    // pinImage.className = "pinIconPos"

    //pinButton.append(pinImage)

    const pinTag = document.createElement("div")
    pinTag.innerHTML = "Edit"

    pinButton.append(pinTag)

    const nextLine = document.createElement("br")

    const takeQuizButton = document.createElement("a")
    takeQuizButton.className = "searchResult-Btns"
    takeQuizButton.href = "/quiz/take_quiz"

    takeQuizButton.innerHTML = "Take Quiz"

    buttonsContainer.append(pinButton)
    buttonsContainer.append(nextLine)
    buttonsContainer.append(takeQuizButton)

    lowerPartResultContainer.append(numFlashCardsAndCreatorContainer)
    lowerPartResultContainer.append(buttonsContainer)

    resultContainer.append(upperPartResultContainer)
    resultContainer.append(lowerPartResultContainer)

    $('#searchResultContainer').prepend(resultContainer)
}

function renderResultUser(result) {

    //alert(result.authorName)
    for (var i = 0; i < result.searchResults.length; i++) {
        if(result.authorName == result.searchResults[i].author.username){ //quiz belongs to the user
            displayResultUserEdit(result.searchResults[i]._id, result.searchResults[i].title, result.searchResults[i].subject,
                result.searchResults[i].description, result.searchResults[i].deck.length, result.searchResults[i].author.username)
        } else {
            displayResultUserPin(result.searchResults[i]._id, result.searchResults[i].title, result.searchResults[i].subject,
                result.searchResults[i].description, result.searchResults[i].deck.length, result.searchResults[i].author.username)
        }
    }    
}


function addFunctionality () {
    $("#pinBtn").click(function(){
        $("#searchid").val($(this).attr("data-id"))
        $('#hiddensearchform').submit()
    })
}