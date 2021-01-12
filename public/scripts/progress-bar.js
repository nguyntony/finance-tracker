const progress = document.querySelectorAll(".progress-done")



progress.forEach(p => {
    setTimeout(() => {
        p.style.opacity = 1;
        p.style.width = progress.getAttribute("data-done") + '%';
    }, 500)
})