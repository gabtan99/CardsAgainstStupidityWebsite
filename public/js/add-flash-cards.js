$(document).ready(function(){

    counter = 0

    createCard()
    
    $('.add-card a').click(function(){
        createCard()
        return false;
    })

    function createCard(){
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
        
        removeCard.onclick = function(){
            cardElementDiv.remove()
            counter--
            checkCardLabels(counter)
            return false
        }
    }

    function checkCardLabels(counter){
        counterTemp = counter
        $(".card-element").each(function(){
            $(this).children(".card-header").children("#card-label").html("Flashcard "+counterTemp)
            counterTemp--
        })
    }

    $('#next-button').click(createFlashcardCollection())
    $('#save-button').click(createFlashcardCollection())

    function createFlashcardCollection(){
        var cards = []
        $(".card-element").each(function(){
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

    function editQuiz(){
        let title = $('#titlebox').val()
        let subject = $('#subjectbox').val()
        let description = $('#descripbox').val()

        var quiz = {
            Title: title,
            Subject: subject,
            Description: description,
            Flahscards: createFlashcardCollection()
        }

        return quiz
    }
})