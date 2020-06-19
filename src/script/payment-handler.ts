import { orderHandler } from './api-handlers/seats';
import { rechargeAccount } from './api-handlers/user';

document.querySelector('.bank__close').addEventListener('click', () => {
  document.querySelector('.bank').classList.remove('modal--visible');
});

export const settingPaymentOptions = () => {
  const buttonToLogIn: HTMLButtonElement = document.querySelector('.summary__log-in');
  const buttonToPay: HTMLButtonElement = document.querySelector('.summary__pay');

  buttonToPay.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.bank').classList.add('modal--visible');
    document.querySelector('.bank__value').innerHTML = `${sessionStorage.getItem('price') ? sessionStorage.getItem('price') : 0} $`
  });

  buttonToLogIn.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.login').classList.add('modal--visible');
  });

  if (sessionStorage.getItem('user')) {
    buttonToPay.innerHTML = "Doładuj konto";
    buttonToLogIn.style.display = "none";
  } else {
    buttonToPay.innerHTML = "Kup bez logowania";
    buttonToLogIn.style.display = "block";
    buttonToLogIn.innerHTML = "Zaloguj się by kupić"
  }
}

const orderFinish = async (price: number, accountState: number) => {

  if(sessionStorage.getItem('user')) {
    const email = JSON.parse(sessionStorage.getItem('user')).email;
    const value = accountState - price;

    const updatedData = await rechargeAccount(email, value);

    console.log(updatedData);
    sessionStorage.setItem('accountState',`${updatedData.accountState}`);
    sessionStorage.setItem('user', JSON.stringify(updatedData));
  }
 alert('Poprawnie złożono zamówienie! Czekaj na wiadomość z biletami!')
 sessionStorage.clear();
 window.location.reload();
}

document.querySelector('.summary__order').addEventListener('click', async (e) => {
  document.querySelector('.loader').classList.add('modal--visible')
  e.preventDefault();

    const price = Number(sessionStorage.getItem('price'));
    const accountState = Number(sessionStorage.getItem('accountState'));

    if(accountState >= price) {
      const seats = JSON.parse(sessionStorage.getItem('using-seats')).map((seat: {seat: string; isVip: boolean}) => {
        const seatInfo = seat.seat.split('');
        return {row: seatInfo[0], seat: Number(seatInfo[1])};
      });
      
      const order = {
        departure: sessionStorage.getItem('departure'),
        destination: sessionStorage.getItem('destination'),
        date: sessionStorage.getItem('date').split('-').reverse().join('.'),
        hour: sessionStorage.getItem('time'),
        seats
      }
      console.log(order);
      const newOrder = await orderHandler(order)
      if(newOrder) await orderFinish(price, accountState);

    } else {
      alert('Za mało środków na koncie!')
      if(window.confirm('Czy chcesz doładować swoje konto?')) {
        document.querySelector('.bank__value').innerHTML = sessionStorage.getItem('price') + " $";
        document.querySelector('.bank').classList.add('modal--visible');
        
      }
    }

    document.querySelector('.loader').classList.remove('modal--visible')
});