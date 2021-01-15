function popUp() {
    document.querySelector(".messageHide").classList.add("message")
    document.querySelector(".message").classList.remove("messageHide")
}

export { popUp }