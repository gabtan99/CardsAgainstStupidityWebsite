$(document).ready(function(){

    $('#submitBtn').click(function(){

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
                    takeQuizButton.href = "/quiz/pre_start"

                    takeQuizButton.innerHTML = "Take Quiz"

                buttonsContainer.append(pinButton)
                buttonsContainer.append(nextLine)
                buttonsContainer.append(takeQuizButton)

        lowerPartResultContainer.append(numFlashCardsAndCreatorContainer)
        lowerPartResultContainer.append(buttonsContainer)

        resultContainer.append(upperPartResultContainer)
        resultContainer.append(lowerPartResultContainer)

        $('#searchResultContainer').prepend(resultContainer)

    })
})