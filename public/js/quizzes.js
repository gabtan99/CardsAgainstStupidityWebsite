$(document).ready(function () {

    $("button.editBtn").click(function () {
        $("#editid").val($(this).attr("data-id"))
        $("#editform").submit()
    })

    $("button.takeBtn").click(function () {
        $("#takeid").val($(this).attr("data-id"))
        $("#takeform").submit()
    })

    $("a.unpinBtn").click(function () {

        let id = $(this).attr("data-id")

        $.ajax ({
            url: "/quiz/unpin_quiz",
            method: "GET",
            data: {
                id: id
            },
            success: function(result) {
                if(result == "1") {
                    $("a[data-id='"+id+"']").parent().parent().parent().remove()
                }
            }

        })


        
    })

})