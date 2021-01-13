const hamburger = document.querySelector("#hamburger")
const navLinks = document.querySelector("#desktop-responsive-ul")
const links = document.querySelectorAll("#desktop-responsive-ul li")

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open")
    links.forEach(l => {
        l.classList.toggle("fade")
    })
})