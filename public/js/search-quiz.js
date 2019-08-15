$(document).ready(function () {
    $('#SearchForm').submit(async function (e) {

        var isGuest = true

        e.preventDefault()

        let keyword = $("#searchbox").val()

        if (keyword === '') {
            emptyContainer()
            displayError("Enter a keyword")
        } else {
            emptyContainer()
            hideError("")
            await $.ajax({
                url: "search-keyword",
                method: "GET",
                data: {
                    keyword: keyword
                },
                success: function (result) {
                    if (result.length == 0) {
                        emptyContainer()
                        displayError("No Results Found")
                    } else {
                        emptyContainer()
                        hideError("")
                        renderResultUser(result)
                        addFunctionality()
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

function hideError(msg) {
    $("#error-messages").empty()
    let error = document.getElementById("error-div")
    error.className = "error-box tab"
    $("#error-messages").append('<li>' + msg + '</li')
    // shows the error message by appending the invisible list
}

function emptyContainer() {
    $("#searchResultContainer").empty()
}



// function addFunctionality () {
//     $("#pinBtn").click(function(){
//         $("#searchid").val($(this).attr("data-id"))
//         $('#hiddensearchform').submit()
//     })
// }

// function addFunctionality(){
//     $("#pinBtn").click(async function (e) {

//         e.preventDefault()

//         $("#searchid").val($(this).attr("data-id"))

//         await $.ajax({
//             url: "actionQuiz",
//             method: "GET",
//             data: {
//             },
//             success: function (result) {
//                 if (result == '1') {
//                     console.log("Pin Success")
//                     $("#tagPin").html("Unpin")
//                 } else {
//                     console.log("Pin Fail")
//                 }
//             },
//         })
        
//     })
// }