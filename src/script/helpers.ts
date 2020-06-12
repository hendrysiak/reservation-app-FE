export const inputValidator = (input: HTMLInputElement) => {
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