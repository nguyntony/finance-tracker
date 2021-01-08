const signupBtn = document.querySelector("#signupBtn")
const signupForm = document.querySelector("#signupForm")

signupBtn.addEventListener("click", () => {
    signupForm.classList.toggle("hidden")
})