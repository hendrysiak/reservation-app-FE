  // tslint:disable: forin

// Check if seat is taken

export const activator = (event: any) => {
  if (event.target.classList.contains('disabled')) {
    alert('Miejsce zajęte!');
    return
  };
  event.target.classList.toggle('active')
};

// displaying seats

export const seatConstructor_AIRBUS320 = (AIRBUS320Seats: any) => {
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

export const seatConstructor_DeltaA320_200_1Seats = (DeltaA320_200_1Seats: any) => {
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

export const seatConstructor_KLM_B737_700_1Seats = (KLM_B737_700_1Seats: any) => {
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