  // tslint:disable: forin

import { AIRBUS320Seats, DeltaA320_200_1Seats, KLM_B737_700_1Seats, timetable } from './js/variables';
import { seatConstructor_AIRBUS320, seatConstructor_DeltaA320_200_1Seats, seatConstructor_KLM_B737_700_1Seats} from './script/seat-constructor';

import  './script/form';

import './scss/index.scss';

// Min date handler

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
const day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;

const minDate = `${year}-${month}-${day}`;

document.querySelector('.form-init__date').setAttribute('value', minDate);
document.querySelector('.form-init__date').setAttribute('min', minDate);

const destinationChangeHandler = (select: HTMLSelectElement): void => {
   const destinationOfFly = document.getElementById('destination');
   destinationOfFly.style.border = ''
   destinationOfFly.innerHTML = '';
    for (const departure in timetable) {
      if (select.value === departure) {
        for (const destination in timetable[departure]){
          const option = document.createElement('option');
          if (!sessionStorage.getItem('destination')) sessionStorage.setItem('destination', destination);
          option.value = destination;
          option.innerText = destination.charAt(0).toUpperCase() + destination.slice(1);
          destinationOfFly.appendChild(option);
        }
      }
    }
    
    if (!sessionStorage.getItem('date')) sessionStorage.setItem('date', minDate);
}

const setHourOfDeparture = (): void => {
  const departureTimeSelect = document.getElementById('time');
  departureTimeSelect.style.border = ''
  departureTimeSelect.innerHTML = '';
  const departure: HTMLSelectElement = document.getElementById('departure') as HTMLSelectElement;
  const destination: HTMLSelectElement = document.getElementById('destination') as HTMLSelectElement;

  timetable[departure.value][destination.value].forEach((hour: string) => {
    const timeOption = document.createElement('option');
    timeOption.value = hour;
    timeOption.innerText = hour;
    departureTimeSelect.appendChild(timeOption);
  })
  if (!sessionStorage.getItem('time')) sessionStorage.setItem('time', timetable[departure.value][destination.value][0]);
}

document.getElementById('departure').addEventListener('change', () => destinationChangeHandler(event.target as HTMLSelectElement));
document.getElementById('destination').addEventListener('change', (event) => {
  const target = event.currentTarget as HTMLSelectElement
  console.log(target.value);
});
document.querySelectorAll('.form-init__place').forEach((place: HTMLSelectElement) => place.addEventListener('change', () => setHourOfDeparture()));


const formValidator = () => {
  const form = Array.from(document.querySelector('.form-init').getElementsByTagName('select'));
  const persons = Array.from(document.querySelector('.form-init__persons').getElementsByTagName('input'));

  let passUser = true;

  form.forEach((select: HTMLSelectElement) => {
    if (!select.value) {
      passUser = false;
      select.style.border = '2px solid red'
    } else {
      select.style.border = ''
    }
  });
  persons.forEach((input: HTMLInputElement) => {
    if (!input.value) {
      passUser = false;
      input.style.border = '2px solid red'
    } else {
      input.style.border = ''
    }
  });
  return passUser
}

const sessionStorageSetter = () => {
  const selects = document.getElementsByTagName('select');
  const inputs = document.getElementsByTagName('input');
  const formsInputs = [...Array.from(selects), ...Array.from(inputs)];
  formsInputs.forEach(el => el.addEventListener('change', () => {
    sessionStorage.setItem(el.id, el.value);
  }));

  formsInputs.forEach(el => {
    const item = sessionStorage.getItem(el.id);
    if (!item) sessionStorage.setItem(el.id, el.value);

  });

};

// document.querySelector('.info__button button--next').addEventListener('click', () => sessionStorageSetter());


// Struktura danych:
// wylot:
// przylot:
// godziny:
// wolne miejsca

// Do sessionStorage

const db = {
I:{
  departure: "Paris",
  arrival: "Dubai",
  hours: ['17:00', '20:00', '22:00'],
  seats: ['A1', 'A2', 'A3'],
},
II:{},
III:{},
IV:{},
V:{},
VI:{},
VII:{},
VIII:{},
IX:{}
}

// Steper handler

let step = 0;

// Init value must be '0'

let transforming = 0;
const stepper = document.querySelectorAll('.step');

const main: any = document.querySelector('.main__forms');

document.querySelector('.button--next').addEventListener('click', (): any => {
  const validation = formValidator();
  if (!validation) return;
  sessionStorageSetter();

  if (validation) {
    transforming -= 101/5

    if (step < 3) step = step + 1;
    else {
      step = 0
      transforming = 0;
    };
    stepper.forEach((step: any) => step.classList.remove('active'));
    stepper[step].classList.add('active');
    main.style.transform = `translate(${transforming}%, 0)`;
  }

  
});

// Standard it should be inside function above




seatConstructor_DeltaA320_200_1Seats(DeltaA320_200_1Seats);
// seatConstructor_AIRBUS320(AIRBUS320Seats);
// seatConstructor_KLM_B737_700_1Seats(KLM_B737_700_1Seats);

