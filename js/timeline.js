"use strict";

const boxes = document.querySelectorAll(".box");

window.addEventListener("scroll", DisplayContent);
DisplayContent();

function DisplayContent() {
  const TriggerBottom = (window.innerHeight / 5) * 4;

  boxes.forEach((box) => {
    const topBox = box.getBoundingClientRect().top;

    if (topBox < TriggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}