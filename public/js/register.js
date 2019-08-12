$(document).ready(() => {

    $("#submitBtn").click(() => {

        let username = $("#usernamefield").val()
        let password = $("#passwordfield").val()
        let confirm = $("#confirmfield").val()


        if (username === '') {
            displayError("Enter a username")
        } else if (!isValid(password)) {
            displayError("Password must be at least 6 characters")
        } else if (!passwordMatch(password, confirm)) {
            displayError("Passwords do not match")
        } else {
            $.ajax({
                url: "create-account",
                method: "POST",
                data: {
                    username: username,
                    password: password
                },
                success: function (result) {
                    if (result == '1') {
                        window.location = "/home"
                    } else {
                        displayError(result)
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

function validUsername() {
    let validmsg = document.getElementById("input-valid-div")
    let username = $("#usernamefield").val()
    let usernamefield = document.getElementById("usernamefield")


    if (username !== '') {
        $.ajax({
            url: "check-username",
            method: "POST",
            data: {
                username,
            },
            success: function (available) {
                if (available == "1") {
                    validmsg.innerHTML = "Username is available!"
                    validmsg.className = "valid"
                    usernamefield.className = "input input-field valid-input"

                } else {
                    validmsg.innerHTML = "Username is already taken!"
                    validmsg.className = "invalid"
                    usernamefield.className = "input input-field invalid-input"
                }
            },
        })
    } else {
        validmsg.innerHTML = '';
        usernamefield.className = "input input-field"
    }
}

function isValid(s) {
    // check for null or too short
    if (!s || s.length < 6) {
        return false;
    }
    // all requirements have been satisfied
    return true;
}

function passwordMatch(a, b) {

    if (a !== b) {
        return false;
    } else {
        return true;
    }
}