let logo = document.querySelector(".logo");
gsap.from(logo, {
  delay: ".5",
  color: "red",
  backgroundColor: "yellow",
  borderRadius: "10cap",
  rotate: 360,
  scale: "1",
  duration: "1",
  ease: "bounce.out",
});

gsap.from(".menu-item", {
  y: "-100",
  ease: "power3.out",
  duration: "1.2",
  stagger: ".2",
});

// gsap.from(".hero-title", {
//   x: "-5000px",
//   duration: "1.5",
//   ease: "power4.out",
// });

// gsap.from(".hero-text", {
//   x: "5000px",
//   duration: "1.5",
//   ease: "power4.out",
// });

// gsap.from(".hero-stat", {
//   y: "5000",
//   duration: "1.5",
//   ease: "power4.out",
//   stagger: ".2",
// });

// gsap.from(".hero-image", {
//   scale: "-2",
//   rotate: 180,
// });

const text = new SplitType(".hero-title", { types: "words, chars" });

text.chars.forEach((char, index) => {
  let charsTl = gsap.timeline();

  charsTl.from(char, {
    y: gsap.utils.random(-200, 200),
    x: gsap.utils.random(-350, 350),
    rotate: gsap.utils.random(-360, 360),
    scale: gsap.utils.random(0, 2),
    opacity: 0,
    duration: 0.75,
    ease: "back.out",
    delay: index * 0.01,
  });
  charsTl.from(char, {
    color: `rgb(${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)})`,
    duration: 1,
  });

  char.addEventListener("mouseenter", charsHover);

  function charsHover() {
    gsap
      .timeline()
      .to(char, {
        y: gsap.utils.random(-50, 50),
        x: gsap.utils.random(-50, 50),
        rotate: gsap.utils.random(-90, 90),
        scale: gsap.utils.random(0.5, 1.5),
        duration: 0.5,
        ease: "back.out",
        color: `rgb(${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)},${gsap.utils.random(0, 255)})`,
        onStart: () => {
          char.removeEventListener("mouseenter", charsHover);
        },
      })
      .to(char, {
        y: 0,
        x: 0,
        rotate: 0,
        scale: 1,
        delay: 1,
        ease: "back.out",
        duration: 0.5,
        color: `rgb(209, 96, 96)`,
        onComplete: () => {
          setTimeout(() => {
            char.addEventListener("mouseenter", charsHover);
          }, 100);
        },
      });
  }
});
