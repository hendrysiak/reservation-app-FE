import  './script/form';

import './scss/index.scss';

let step = 0;
let transforming = 0
const stepper = document.querySelectorAll('.step');

const main: any = document.querySelector('.main__forms');

document.querySelector('.button--next').addEventListener('click', (): any => {
  transforming -= 100/5

  if (step < 3) step = step + 1;
  else {
    step = 0
    transforming = 0;
  };
  stepper.forEach((step: any) => step.classList.remove('active'));
  stepper[step].classList.add('active');

  main.style.transform = `translate(${transforming}%, 0)`
});