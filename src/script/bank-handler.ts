import { inputValidator } from './helpers';

document.querySelector('.summary__pay').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.bank').classList.add('modal--visible');
  document.querySelector('.bank__value').innerHTML = sessionStorage.getItem('price') + " $";

});


document.querySelectorAll('.bank__item').forEach(bankBtn => bankBtn.addEventListener('click', (e) => {

  document.querySelector('.loader').classList.add('modal--visible');
  e.preventDefault();

  const nameInput: HTMLInputElement = document.querySelector('.bank__name');
  const surnameInput: HTMLInputElement = document.querySelector('.bank__surname');
  const emailInput: HTMLInputElement = document.querySelector('.bank__email');



  if ([nameInput, surnameInput, emailInput].map(input => inputValidator(input)).every(info => info === true)) {

    const actualAccountState = sessionStorage.getItem('accountState') ? Number(sessionStorage.getItem('accountState')) : 0;
    sessionStorage.setItem('accountState',`${Number(sessionStorage.getItem('price')) + actualAccountState}`);

    document.querySelector('.summary__account').innerHTML = `${sessionStorage.getItem('accountState')} $`

    document.querySelector('.bank').classList.remove('modal--visible');
    document.querySelector('.loader').classList.remove('modal--visible');
  } else {

    document.querySelector('.loader').classList.remove('modal--visible');
    return alert("Nieprawidłowe dane!");
  }
}));
