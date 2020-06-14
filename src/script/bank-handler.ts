document.querySelector('.summary__pay').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('.bank').classList.add('modal--visible');
  document.querySelector('.bank__value').innerHTML = sessionStorage.getItem('price') + " $";

});

