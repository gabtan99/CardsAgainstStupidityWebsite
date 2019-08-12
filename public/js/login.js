$(document).ready(() => {
    $("#submitBtn").click(() => {

        if ($("#usernamefield").val() === '') {
            displayError("Enter a username")
        } else {
            $.ajax({
                url: "check-login",
                method: "POST",
                data: {
                    username: $("#usernamefield").val(),
                    password: $("#passwordfield").val()
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
    error.className += "shown"
    $("#error-messages").append('<li>' + msg + '</li')
    // shows the error message by appending the invisible list
}