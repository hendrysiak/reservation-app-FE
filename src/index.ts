  // tslint:disable: forin

import { AIRBUS320Seats, DeltaA320_200_1Seats, KLM_B737_700_1Seats } from './js/variables';

import  './script/form';

import './scss/index.scss';

// Struktura danych:
// wylot:
// przylot:
// godziny:
// wolne miejsca

// Do localstorage

const db = {
I:{
  departure: "Paris",
  arrival: "Dubai",
  hours: ['17:00', '20:00', '22:00'],
  freeSeats: ['A1', 'A2', 'A3'],
  takenSeats: ['A4', 'A5', 'A6']
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

let transforming = -40
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

});

// Standard it should be inside function above

main.style.transform = `translate(${transforming}%, 0)`


// Min date handler

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
const day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;

const minDate = `${year}-${month}-${day}`;

document.querySelector('.form-init__date').setAttribute('value', minDate);
document.querySelector('.form-init__date').setAttribute('min', minDate);


const activator = (event: any) => {
  if (event.target.classList.contains('disabled')) {
    alert('Miejsce zajęte!');
    return
  };
  event.target.classList.toggle('active')
};

const seatConstructor_AIRBUS320 = (AIRBUS320Seats: any) => {
  const AIRBUS320 = document.createElement('div');
  AIRBUS320.classList.add('AIRBUS320');
  

  for (const row in AIRBUS320Seats) {
    const rowOfSeat = document.createElement('section');
    rowOfSeat.setAttribute('data-row', `${row}`);
    rowOfSeat.classList.add('AIRBUS320Row');

    AIRBUS320Seats[row].forEach((seat: any) => {
      const seatToDisplay = document.createElement('div');
      seatToDisplay.setAttribute('data-seat', `${row}${seat.number}`);
      seatToDisplay.setAttribute('data-slot', `${seat.slot}`);
      seatToDisplay.setAttribute('data-vip', `${seat.isVip}`);
      seatToDisplay.classList.add('AIRBUS320Seat');
      if(!seat.slot) seatToDisplay.classList.add('disabled');
      seatToDisplay.addEventListener('click', activator);
      rowOfSeat.appendChild(seatToDisplay);
    });
    AIRBUS320.appendChild(rowOfSeat);
  }

  document.querySelector('.airbus').appendChild(AIRBUS320);
}

const seatConstructor_DeltaA320_200_1Seats = (DeltaA320_200_1Seats: any) => {
  const DeltaA320_200_1 = document.createElement('div');
  DeltaA320_200_1.classList.add('DeltaA320_200_1');
  const DeltaA320_200_1Container = document.createElement('div');
  DeltaA320_200_1Container.classList.add('DeltaA320_200_1Container');
  DeltaA320_200_1.appendChild(DeltaA320_200_1Container);

  for (const sector in DeltaA320_200_1Seats) {
    const sectorToDisplay = document.createElement('section');
    sectorToDisplay.setAttribute('data-sector', `${sector}`);
    sectorToDisplay.classList.add('DeltaA320_200_1Sector');

    for (const row in DeltaA320_200_1Seats[sector]){
      DeltaA320_200_1Seats[sector][row].forEach((seat: any) => {
        const seatToDisplay = document.createElement('div');
        seatToDisplay.setAttribute('data-seat', `${row}${seat.number}`);
        seatToDisplay.setAttribute('data-slot', `${seat.slot}`);
        seatToDisplay.setAttribute('data-vip', `${seat.isVip}`);
        if (sector === 'VIP1' || sector === 'VIP2') seatToDisplay.classList.add('DeltaA320_200_1SeatVip')
        else seatToDisplay.classList.add('DeltaA320_200_1Seat');
        if(!seat.slot) seatToDisplay.classList.add('disabled');
        seatToDisplay.addEventListener('click', activator);
        sectorToDisplay.appendChild(seatToDisplay);
      });
    }
    DeltaA320_200_1Container.appendChild(sectorToDisplay);
  }
  document.querySelector('.airbus').appendChild(DeltaA320_200_1);
}
const seatConstructor_KLM_B737_700_1Seats = (KLM_B737_700_1Seats: any) => {
  const KLM_B737_700_1 = document.createElement('div');
  KLM_B737_700_1.classList.add('KLM_B737_700_1');
  const KLM_B737_700_1Container = document.createElement('div');
  KLM_B737_700_1Container.classList.add('KLM_B737_700_1Container');
  KLM_B737_700_1.appendChild(KLM_B737_700_1Container);

  for (const sector in KLM_B737_700_1Seats) {
    const sectorToDisplay = document.createElement('section');
    sectorToDisplay.setAttribute('data-sector', `${sector}`);
    sectorToDisplay.classList.add('KLM_B737_700_1Sector');

    for (const row in KLM_B737_700_1Seats[sector]){
      KLM_B737_700_1Seats[sector][row].forEach((seat: any) => {
        const seatToDisplay = document.createElement('div');
        seatToDisplay.setAttribute('data-seat', `${row}${seat.number}`);
        seatToDisplay.setAttribute('data-slot', `${seat.slot}`);
        seatToDisplay.setAttribute('data-vip', `${seat.isVip}`);
        if (sector === 'VIP1' || sector === 'VIP2') seatToDisplay.classList.add('KLM_B737_700_1SeatVip')
        else seatToDisplay.classList.add('KLM_B737_700_1Seat');
        if(!seat.slot) seatToDisplay.classList.add('disabled');
        seatToDisplay.addEventListener('click', activator);
        sectorToDisplay.appendChild(seatToDisplay);
      });
    }
    KLM_B737_700_1Container.appendChild(sectorToDisplay);
  }
  document.querySelector('.airbus').appendChild(KLM_B737_700_1);
}

seatConstructor_DeltaA320_200_1Seats(DeltaA320_200_1Seats);
// seatConstructor_AIRBUS320(AIRBUS320Seats);
// seatConstructor_KLM_B737_700_1Seats(KLM_B737_700_1Seats);