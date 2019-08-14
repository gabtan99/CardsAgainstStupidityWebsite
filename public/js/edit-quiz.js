$(document).ready(function(){
    $("button.editBtn").click(function(){
        let id = $(this).attr("data-id")
        $.ajax({
            url: "/quiz/edit_quiz",
            method: "GET",
            data: {
                id: $(this).attr("data-id")
            }
        })
    })
})