var currentTab

$(document).ready(function () {
    currentTab = 2;
    showTab(currentTab)
})

function showTab(n) {

    var tabs = $(".tab")

    tabs[n].style.display = "block"

    if (n == 0) {
        document.getElementById("back-nav").style.display = "none"
    } else {
        document.getElementById("back-nav").style.display = "inline"
    }

    if (n == 2) {
        document.getElementById("nextBtn").style.display = "none"
    } else {
        document.getElementById("nextBtn").style.display = "flex"
    }

    fixStepIndicator(n)
}


function nextPrev(n) {
    var tabs = $(".tab")

    tabs[currentTab].style.display = "none"

    currentTab = currentTab + n

    showTab(currentTab)
}

function fixStepIndicator(n) {

    var ind = $(".circle")

    for (var i = 0; i < ind.length; i++) {
        ind[i].className = "circle statustext"
    }

    ind[n].className = "circle statustext selected"
}