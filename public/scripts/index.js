const modal = document.querySelector("#modal")
const buttonSearch = document.querySelector("#page-home main a")
const buttonClose = document.querySelector("#modal .content .header a")


buttonSearch.addEventListener("click", function(){
    modal.classList.remove("hide")
})

buttonClose.addEventListener("click", function(){
    modal.classList.add("hide");
})