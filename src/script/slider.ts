const path = require('path');

let step = 0;

const images = [
  `${path.resolve(__dirname)}/assets/slider1.jpg`,
  `${path.resolve(__dirname)}/assets/slider2.jpg`,
  `${path.resolve(__dirname)}/assets/slider3.jpg`,
  `${path.resolve(__dirname)}/assets/slider4.jpg`,
]

const slide: HTMLDivElement = document.querySelector('.slider__content');

setInterval(() => {
  if (step < 4) {
    step++
    slide.style.backgroundImage = `url(${images[step]})`;

  } else step = 0;

}, 2000)