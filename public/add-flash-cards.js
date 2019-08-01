$(document).ready(function(){
    $('.add-card a').click(function(){

        counter = 2

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

        //black cards
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

        return false;
    })
})