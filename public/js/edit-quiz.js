$(document).ready(function () {
    $("button.editBtn").click(function () {
        $("#editid").val($(this).attr("data-id"))
        $("#editform").submit()
    })

    $("#takeQuizBtn").click(function () {
        $("#takeid").val($(this).attr("data-id"))
        $("#takeform").submit()
    })
})