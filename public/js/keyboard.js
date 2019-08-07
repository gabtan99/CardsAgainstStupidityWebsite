document.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    var key = event.key || event.keyCode;

    if (key === 'K') {
        knewAnswer();
    } else if (key === 'G') {
        guessedAnswer();
    }
});

function knewAnswer() {
    console.log("i knew it")
}

function guessedAnswer() {
    console.log("i guessed")
}