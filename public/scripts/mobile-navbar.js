let card = document.getElementById("ham");
let nav = document.getElementById("mobile-li")
let tl = gsap.timeline({ defaults: { ease: "power1.out" } });
let toggle = false;

tl.to(".ham", {
    background: "#F8C583",
    borderRadius: "0 40% 40% 0",
});
tl.to(
    "#mobile-li",
    {
        clipPath: "ellipse(100% 100% at 50% 50%)",
    },
    "-=.5"
);
tl.to(
    "#mobile-li a",
    {
        opacity: 1,
        transform: "translateX(0)",
        stagger: 0.2,
    },
    "-=.2"
);
tl.pause();

card.addEventListener("click", () => {
    toggle = !toggle;
    if (toggle ? tl.play() : tl.reverse());
});