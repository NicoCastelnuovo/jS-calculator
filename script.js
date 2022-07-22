const current = document.querySelector('.current');
const chain = document.querySelector('.chain');

const buttonNodeList = document.querySelectorAll('.button');
// let buttons = [];
// buttonNodeList.forEach(item => {
//   buttons = [...buttons, item.textContent]
// })

let operation = {
  firstNumber: '',
  operator: '',
  secondNumber: '',
};

const operate = (obj) => {
  obj.firstNumber = eval(`${obj.firstNumber}${obj.operator}${obj.secondNumber}`)
  obj.operator = '';
  obj.secondNumber = '';
  return obj.firstNumber;
}

buttonNodeList.forEach(item => {
  item.addEventListener('click', () => {
    if (item.textContent == 'C') {
      operation.firstNumber = '';
      operation.operator = '';
      operation.secondNumber = '';
    }
    else if (item.textContent == '=') {
      operate(operation);
    }
    else if (item.textContent == '+' || item.textContent == '-'
      || item.textContent == '*' || item.textContent == '/') {
      if (operation.operator == '') {
        operation.operator = item.textContent;
      } else { // if want to chain more and more operation without clicking equals
        operate(operation);
        operation.operator = item.textContent;
      }
    }
    else {
      if (operation.operator == '') {
        operation.firstNumber += item.textContent;
      } else {
        operation.secondNumber += item.textContent;
      }
    }
    console.log(operation)
  })
})
