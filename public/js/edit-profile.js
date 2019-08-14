$(document).ready(() => {

    $("#editForm").submit(function (e) {

        e.preventDefault()

        let oldp = $("#oldpasswordfield").val()
        let newp = $("#newpasswordfield").val()

        if (isValid(newp)) {
            $.ajax({
                url: "update-password",
                method: "POST",
                data: {
                    oldpass: oldp,
                    newpass: newp
                },
                success: function (result) {
                    if (result == '1') {
                        window.location = "/user"
                    } else {
                        displayError(result)
                    }
                },
            })
        } else {
            displayError("Password must be at laest 6 characters")
        }



    })
})

function isValid(s) {
    // check for null or too short
    if (!s || s.length < 6) {
        return false;
    }
    // all requirements have been satisfied
    return true;
}

function displayError(msg) {
    $("#error-messages").empty()
    let error = document.getElementById("error-div")
    error.className = "error-box shown"
    $("#error-messages").append('<li>' + msg + '</li')
    // shows the error message by appending the invisible list
}