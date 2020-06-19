const path = require('path');

let step = 0;

const images = [
  `slider__content--first`,
  `slider__content--second`,
  `slider__content--third`,
  `slider__content--fourth`,
]

const messages = [
  'Profesjonalna obsługa',
  'Nowoczesne samoloty',
  'Największe lotniska',
  'Elastyczne godziny lotów'
]

const slide: HTMLDivElement = document.querySelector('.slider__content');
const info: HTMLParagraphElement = document.querySelector('.slider__info');
const steps: NodeListOf<HTMLDivElement> = document.querySelectorAll('.slider__step')

setInterval(() => {
  if (step < 4) {
    slide.className = `slider__content ${images[step]}`;
    info.textContent = messages[step]
    steps.forEach((step: HTMLDivElement) => step.classList.remove('slider__step--active'));
    steps[step].classList.add('slider__step--active')
    
    step++
  } else step = 0;

}, 3000)