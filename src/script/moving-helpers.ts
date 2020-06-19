import { AIRBUS320Seats, DeltaA320_200_1Seats, employedPlane, formValidator, KLM_B737_700_1Seats, pricing, timetable } from './variables';
import { seatConstructor_AIRBUS320, seatConstructor_DeltaA320_200_1Seats, seatConstructor_KLM_B737_700_1Seats, checkSeat} from './seat-handler';
import { settingPaymentOptions } from './payment-handler.ts'

sessionStorage.setItem('step', `0`);

const switchEmployedPlane = (plane: string) => {
  switch (plane) {
    case 'AIRBUS320':
      seatConstructor_AIRBUS320(AIRBUS320Seats);
      checkSeat('AIRBUS320Seat')
      break;
    case 'DeltaA320_200_1':
      seatConstructor_DeltaA320_200_1Seats(DeltaA320_200_1Seats);
      checkSeat('DeltaA320_200_1Seat')
      break;
    case 'KLM_B737_700_1':
      seatConstructor_KLM_B737_700_1Seats(KLM_B737_700_1Seats);
      checkSeat('KLM_B737_700_1Seat')
      break;
  }
}

// Steper handler

const stepper = document.querySelectorAll('.step');

const setActiveStep = (step: number) => {
  stepper.forEach((stepCircle: HTMLDivElement) => stepCircle.classList.remove('active'));
  stepper[step+1].classList.add('active');
  if (step < 3) sessionStorage.setItem('step', `${step + 1}`);
  else {
    sessionStorage.setItem('step', `${0}`);
    sessionStorage.setItem('transforming', `${0}`);
  };
};

const movingHandler = (transforming: number) => {
  const step = sessionStorage.getItem('step');
  document.querySelectorAll('.form').forEach((form: HTMLFormElement) => form.style.visibility = "hidden")
  document.querySelectorAll('.form').forEach((form: HTMLFormElement) => form.style.display = "none")
  document.getElementById(step).style.visibility = "visible";
  document.getElementById(step).style.display = "block";

};

const firstStepHandler = (step: number, transforming: number) => {
  const validation = formValidator();
  if (!validation) return;

  setSessonsVariables();
  if (validation) {
    switchEmployedPlane(employedPlane[sessionStorage.getItem('departure')]);
    const numberOfSeats: number = Number(sessionStorage.getItem('adult')) 
    + Number(sessionStorage.getItem('child')) 
    + Number(sessionStorage.getItem('infant'));

    sessionStorage.setItem('number-of-seats', `${numberOfSeats}`);
    setActiveStep(step);
    movingHandler(transforming);
  }
};

const setSeatMap = () => {
  const plane = employedPlane[sessionStorage.getItem('departure')];
  const seats = Array.from(document.querySelectorAll(`.${plane}Seat`));
  const allSeats = [...seats];
  const usingSeats = allSeats
  .filter((seat: HTMLElement) => seat.classList.contains('active'))
  .map((seat: HTMLElement) => {
    return {
      sector: seat.parentElement.dataset.sector,
      seat: seat.dataset.seat,
      isVip: seat.dataset.vip === "true"
    }
  });
  sessionStorage.setItem('using-seats', JSON.stringify(usingSeats));

};

const setPrices = () => {
  setSeatMap();
  const departure = sessionStorage.getItem('departure');
  const destination = sessionStorage.getItem('destination');

  const standardPrice = pricing[departure][destination];
  const vipPrice = pricing[departure].VIP;

  const adult = Number(sessionStorage.getItem('adult'));
  const child = Number(sessionStorage.getItem('child'));

  const priceOfPackage = adult * standardPrice + (child * 0.5 * standardPrice);

  const isAnyVipInusingSeats = JSON.parse(sessionStorage.getItem('using-seats'))
    .filter((seat: {seat: string, isVip: boolean}) => seat.isVip);

  const pricingInfo = {
    adultPrice: adult * standardPrice,
    childPrice: child * 0.5 * standardPrice,
    vipPrice,
    vipSeats: isAnyVipInusingSeats.length
  };

  sessionStorage.setItem('pricing', JSON.stringify(pricingInfo));

  document.getElementById('package-basic').innerText = `${priceOfPackage + isAnyVipInusingSeats.length * vipPrice} $`;
  document.getElementById('package-business').innerText = `${priceOfPackage * 1.5 + isAnyVipInusingSeats.length * vipPrice} $`;
  document.getElementById('package-plus').innerText = `${priceOfPackage * 2 + isAnyVipInusingSeats.length * vipPrice} $`;
 
};

const secondStepHandler = (step: number, transforming: number) => {
  if (Number(sessionStorage.getItem('number-of-seats')) === 0) {
    setActiveStep(step);
    movingHandler(transforming);
    setPrices();
  } else return alert('Przypisz wszystkie miejsca przed przejściem dalej!');

};

const packageButtons = document.querySelectorAll('.services__value-btn')

packageButtons.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    packageButtons.forEach((button: HTMLButtonElement) => button.classList.remove('package-button--active'))
    const clickedButton = event.target as HTMLButtonElement;
    clickedButton.classList.add('package-button--active');
  }, false)
});

const packageHandler = () => {
  const choosingPackage: HTMLElement = document.querySelector('.package-button--active');
  console.log(choosingPackage.dataset.package);
  if (choosingPackage) {
    const price: number = Number(
      document.querySelector(`#package-${choosingPackage.dataset.package}`)
      .innerHTML.split(' ').splice(0,1));
    sessionStorage.setItem('price', `${price}`);
    return true;
  } else {
    return false;
  }
};


const summaryDisplayHandler = () => {

  const className = 'summary__target';

  const numberOfAdults = Number(sessionStorage.getItem('adult'));
  const numberOfChild = Number(sessionStorage.getItem('child'));
  const numberOfInfant = Number(sessionStorage.getItem('infant'));

  const { adultPrice, childPrice, vipPrice, vipSeats } = JSON.parse(sessionStorage.getItem('pricing'));

  const price = Number(sessionStorage.getItem('price')) - numberOfAdults * adultPrice - childPrice * numberOfChild;


  document.querySelector(`.${className}-adult--amount`).innerHTML = `${numberOfAdults}`;
  document.querySelector(`.${className}-adult--price`).innerHTML = `${adultPrice/numberOfAdults} $`;
  document.querySelector(`.${className}-adult--summary`).innerHTML = `${adultPrice} $`;

  document.querySelector(`.${className}-child--amount`).innerHTML = `${numberOfChild}`;
  document.querySelector(`.${className}-child--price`).innerHTML = `${childPrice > 0 ? childPrice/numberOfChild : 0} $`;
  document.querySelector(`.${className}-child--summary`).innerHTML = `${childPrice} $`;

  document.querySelector(`.${className}-infant--amount`).innerHTML = `${numberOfInfant}`;
  document.querySelector(`.${className}-infant--price`).innerHTML = `${0} $`;
  document.querySelector(`.${className}-infant--summary`).innerHTML = `${0} $`;

  document.querySelector(`.${className}-vip-seats--amount`).innerHTML = `${vipSeats}`;
  document.querySelector(`.${className}-vip-seats--price`).innerHTML = `${vipPrice} $`;
  document.querySelector(`.${className}-vip-seats--summary`).innerHTML = `${vipSeats * vipPrice} $`;

  document.querySelector('.summary__sum--all').innerHTML = `${sessionStorage.getItem('price')} $`;

  const accountState = JSON.parse(sessionStorage.getItem('user')).accountState;

  document.querySelector('.summary__account').innerHTML = `${accountState ? accountState : 0} $`

  settingPaymentOptions();

};

const thirdStepHandler = (step: number, transforming: number) => {

  if(packageHandler()) {
    setActiveStep(step);
    movingHandler(transforming);
    summaryDisplayHandler();
  } else {
    alert('Nie wybrano pakietu!')
  }
};

document.querySelector('.button--next').addEventListener('click', (): void => {
  const step = Number(sessionStorage.getItem('step'));
  const transforming = Number(sessionStorage.getItem('transforming'));

  if (step === 0) {
    firstStepHandler(step, transforming);
  } else if(step === 1) {
    secondStepHandler(step, transforming);
  } else if (step === 2) {
    thirdStepHandler(step, transforming)
  }

  
});

const selects = document.getElementsByTagName('select');
const inputs = document.getElementsByTagName('input');
const formsInputs = [...Array.from(selects), ...Array.from(inputs)];

const setSessonsVariables = () => {
  formsInputs.forEach(el => {
    sessionStorage.setItem(el.id, el.value);
  });
}