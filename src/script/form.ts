document.querySelectorAll('.counter__button').forEach(button => button.addEventListener('click', (event: Event): void => {
  event.preventDefault();
  const target: string = (event.target as HTMLButtonElement).dataset.for;
  const task: string = (event.target as HTMLButtonElement).dataset.step;
  const input: HTMLInputElement = document.getElementById(`${target}`) as HTMLInputElement;
  let newValue;
  switch(task){
    case '+': 
    newValue = Number(input.value) + 1;
    input.value = `${newValue}`;
      break;
    case '-': 
      if(input.id === 'adult' && Number(input.value) === 1) break;
      newValue = Number(input.value) > 0 ? Number(input.value) - 1 : 0;
      input.value = `${newValue}`;
      break;
  }
}))
