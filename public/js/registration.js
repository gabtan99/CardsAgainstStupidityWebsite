window.onload = function () {

    $("#submitBtn").click(function (e) {
        var name = document.getElementById("namefield")
        var username = document.getElementById("usernamefield")
        var password = document.getElementById("passwordfield")
        var confirm = document.getElementById("confirmfield")

        var hasError = false;

        if (password != confirm) {
            hasError = true;
        }

        if (hasError) {
            e.preventDefault();
            alert("Password Do Not Match")
        }
    })

}