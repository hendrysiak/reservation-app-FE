// Min and max date handler


const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() > 9 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`;
const day = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`;

const minDate = `${year}-${month}-${day}`;
const maxDate = `${year + 1}-${month}-${Number(day) - 1}`;

document.querySelector('.form-init__date').setAttribute('value', minDate);
document.querySelector('.form-init__date').setAttribute('min', minDate);
document.querySelector('.form-init__date').setAttribute('max', maxDate);
