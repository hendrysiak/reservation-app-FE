document.querySelectorAll('.counter__button').forEach(button => button.addEventListener('click', (event: any): void => {
  event.preventDefault();
  const target = <string>event.target.dataset.for;
  const task = <string>event.target.dataset.step;
  const input = <any>document.getElementById(`${target}`);
  switch(task){
    case '+': input.value ? input.value = input.value * 1 + 1: null;
      break;
    case '-': input.value > 0 ? input.value = input.value * 1 - 1: null;
      break;
  }
}))
