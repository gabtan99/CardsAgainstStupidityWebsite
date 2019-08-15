$(document).ready(function () {

    $("button.editBtn").click(function () {
        $("#editid").val($(this).attr("data-id"))
        $("#editform").submit()
    })

    $("button.takeBtn").click(function () {
        $("#takeid").val($(this).attr("data-id"))
        $("#takeform").submit()
    })

})