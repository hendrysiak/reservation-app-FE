import { logInHandler } from './api-handlers/user';

import { settingPaymentOptions } from './payment-handler';
import { inputValidator } from './helpers';

const logInForm: HTMLFormElement = document.querySelector('.login__form');

const loginHandler = async (email: string, password: string) => {
  const user = { email, password };

  const userLoggedIn = await logInHandler(user);

  if (userLoggedIn) {

    document.querySelector('.loader').classList.remove('modal--visible')

    sessionStorage.setItem('user', JSON.stringify(userLoggedIn));
    document.getElementById('login-info').innerHTML = userLoggedIn.email;
    document.querySelector('.main__sign-in').innerHTML = "Wyloguj";
    
    sessionStorage.setItem('accountState', `${userLoggedIn.accountState}`)
    document.querySelector('.summary__account').innerHTML = `${sessionStorage.getItem('accountState')} $`
    
    document.querySelector('.login').classList.remove('modal--visible');
    logInForm.style.display = "none";
    logInForm.style.visibility = "hidden";
  } else {

    document.querySelector('.loader').classList.remove('modal--visible');
    logInForm.style.display = "none";
    logInForm.style.visibility = "hidden";

    return alert ('Nie ma takiego użytkownika!');

  }
};

document.querySelector('.main__sign-in').addEventListener('click', (event: Event) => {

  const logIn = event.target as HTMLSpanElement | HTMLButtonElement;

  if (sessionStorage.getItem('user')) {
    if (window.confirm("Czy napewno chcesz się wylogować?")){
      sessionStorage.removeItem('user');
      logIn.innerHTML = "Zaloguj";
      document.getElementById('login-info').innerHTML = "niezalogowany";
    } else return;

  } else {
    document.querySelector('.login').classList.add('modal--visible');
    logInForm.style.display = "flex";
    logInForm.style.visibility = "visible";
  }
});


document.querySelector('.login__log-in').addEventListener('click', async (e) => {

  document.querySelector('.loader').classList.add('modal--visible');

  e.preventDefault();

  const emailInput: HTMLInputElement = document.querySelector('.login__mail');
  const passwordInput: HTMLInputElement = document.querySelector('.login__password');


  if ([emailInput, passwordInput].map(input => inputValidator(input)).every(info => info === true)) {

    await loginHandler(emailInput.value, passwordInput.value);
    settingPaymentOptions();

  } else {

    document.querySelector('.loader').classList.remove('modal--visible');
    return alert("Nieprawidłowe dane!");
  }

});

document.querySelector('.login__close').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.login').classList.remove('modal--visible');
  logInForm.style.display = "none";
  logInForm.style.visibility = "hidden";
});


document.querySelector('.summary__log-in').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.login').classList.add('modal--visible');
  logInForm.style.display = "flex";
  logInForm.style.visibility = "visible";
})