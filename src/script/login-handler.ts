import { logInHandler } from './api-handlers/user';

const inputValidator = (input: HTMLInputElement) => {
  if (!input.value) {
    input.style.border = '2px solid red';
    return false;
  } else if (input.dataset.input === "email"){
    if(input.value.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")) return true;
    else {
      input.style.border = '2px solid red';
      return false
    }
  }
  input.style.border = 'none';
  return true;
};

const loginHandler = async (email: string, password: string) => {
  const user = { email, password };

  const userLoggedIn = await logInHandler(user);

  if (userLoggedIn) {

    document.querySelector('.loader').classList.remove('modal--visible')
    sessionStorage.setItem('user', userLoggedIn);
    document.getElementById('login-info').innerHTML = userLoggedIn.email;
    document.querySelector('.login__sign-in').innerHTML = "Wyloguj";
    document.querySelector('.login').classList.remove('modal--visible');

  } else {

    document.querySelector('.loader').classList.remove('modal--visible');
    return alert ('Nie ma takiego użytkownika!');

  }
};

document.querySelector('.login__sign-in').addEventListener('click', (event: Event) => {

  const logIn = event.target as HTMLSpanElement;

  if (sessionStorage.getItem('user') && window.confirm("Czy napewno chcesz się wylogować?")) {

    sessionStorage.removeItem('user');
    logIn.innerHTML = "Zaloguj";
    document.getElementById('login-info').innerHTML = "niezalogowany";

  } else document.querySelector('.login').classList.add('modal--visible');
});


document.querySelector('.login__log-in').addEventListener('click', async (e) => {

  document.querySelector('.loader').classList.add('modal--visible');

  e.preventDefault();

  const emailInput: HTMLInputElement = document.querySelector('.login__mail');
  const passwordInput: HTMLInputElement = document.querySelector('.login__password');


  if ([emailInput, passwordInput].map(input => inputValidator(input)).every(info => info === true)) {

    await loginHandler(emailInput.value, passwordInput.value);

  } else {

    document.querySelector('.loader').classList.remove('modal--visible');
    return alert("Nieprawidłowe dane!");
  }

});

document.querySelector('.login__close').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.login').classList.remove('modal--visible');
});
