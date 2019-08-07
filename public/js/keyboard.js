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

function knewAnswer() {
    console.log("i knew it")
}

function guessedAnswer() {
    console.log("i guessed")
}