$(document).ready(function () {
    $('#SearchForm').submit(function (e) {
        e.preventDefault()

        displayResultUser();
    })
})

function displayResultGuest() {
    //UPPER
    const resultContainer = document.createElement("div")
    resultContainer.className = "searchResult"

    const upperPartResultContainer = document.createElement("div")
    upperPartResultContainer.id = "topResult"

    const title = document.createElement("div")
    title.className = "searchResultTitle"
    title.innerHTML = "Title"

    const subject = document.createElement("div")
    subject.className = "searchResultUpInfo"
    subject.innerHTML = "Subject"

    const description = document.createElement("div")
    description.className = "searchResultUpInfo"
    description.innerHTML = "Description"

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
    numFlashCards.innerHTML = "# Flashcards"

    const creator = document.createElement("div")
    creator.className = "searchResultUpInfo"
    creator.innerHTML = "By:"

    numFlashCardsAndCreatorContainer.append(numFlashCards)
    numFlashCardsAndCreatorContainer.append(creator)

    //BUTTONS
    const buttonsContainer = document.createElement("div")
    buttonsContainer.id = "buttonsResult"

    const pinButton = document.createElement("a")
    pinButton.id = "pinBtn"
    pinButton.className = "searchResult-Btns"

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

function displayResultUser(dataID, stringTitle, stringSubject, stringDescrip, nCards, stringAuthor) {
    //UPPER
    const resultContainer = document.createElement("div")
    resultContainer.className = "searchResult"
    resultContainer.id = dataID

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
    creator.innerHTML = "By:" + stringAuthor

    numFlashCardsAndCreatorContainer.append(numFlashCards)
    numFlashCardsAndCreatorContainer.append(creator)

    //BUTTONS
    const buttonsContainer = document.createElement("div")
    buttonsContainer.id = "buttonsResult"

    const pinButton = document.createElement("a")
    pinButton.id = "pinBtn"
    pinButton.className = "searchResult-Btns"

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

function renderResultUser() {
    var result = {
        "results": {
            "DzgvcDDm2I": {
                "id": "1",
                "title": "Midterms",
                "subject": "AUTOMAT",
                "description": "Chapter 1-5",
                "nFlashcards": 15,
                "author": "Denzel Co"
            },

            "WD2dqvcdaa": {
                "id": "2",
                "title": "Final Exam",
                "subject": "INTR-OS",
                "description": "Cover to cover coverage",
                "nFlashcards": 20,
                "author": "Denzel Lo"
            },

            "qweqdlw22a": {
                "id": "3",
                "title": "Fun",
                "subject": "WEBAPDE",
                "description": "Web Trivia",
                "nFlashcards": 5,
                "author": "Denzel Ho"
            }
        }
    }

    var resultEntries = result.results;
    var EntryIDs = Object.keys(resultEntries);

    for (var i = 0; i < EntryIDs.length; i++) {
        var resultID = resultEntries[EntryIDs[i]];
        var result = {
            resultNum: resultID
        };

        displayResultUser(result.resultNum["id"], result.resultNum["title"], result.resultNum["subject"],
            result.resultNum["description"], result.resultNum["nFlashcards"], result.resultNum["author"])
    }

}