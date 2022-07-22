const current = document.querySelector('.current');
const chain = document.querySelector('.chain');

const buttonNodeList = document.querySelectorAll('.button');

let operation = {
  firstNumber: '',
  operator: '',
  secondNumber: '',
};

const operate = (obj) => {
  if (obj.operator == '/' && obj.secondNumber == '0') {
    return 'ERROR';
  } 
  obj.firstNumber = eval(`${obj.firstNumber}${obj.operator}${obj.secondNumber}`)
  obj.operator = '';
  obj.secondNumber = '';
  return obj.firstNumber;
}

const displayValue = (value, format) => {
  let display = current.textContent;
  if (format == 'add') {
    return display += value;
  }
  else if (format == 'changeTheLast') {
    return display = display.slice(0, display.length - 1) + value;
  }
  return display = value;
}

buttonNodeList.forEach(item => {
  item.addEventListener('click', () => {
    const value = item.textContent;
    if (value == 'C') {
      operation.firstNumber = '';
      operation.operator = '';
      operation.secondNumber = '';
      displayValue('');
    }
    else if (value == '=') {
      operate(operation);
      displayValue(operation.firstNumber)
    }
    else if (['+', '-', '*', '/'].indexOf(value) != -1) {
      // IF the operator is not yet selected
      if (operation.operator == '') {
        operation.operator = value;
        displayValue(value, 'add')
      }
      // ELSE IF the second number is not yet selected,
      // the behavior is: change the operator based on clicks 
      else if (operation.secondNumber == '') {
        operation.operator = value;
        displayValue(value, 'changeTheLast')
      }
      // ELSE if want to chain operations without pushing equal sign
      else {
        operate(operation); // return the result
        displayValue(operate(operation) + value); // display result + new sign
        operation.operator += value; // add the new sign in the operation obj
      }
    }
    else {
      if (operation.operator == '') { //
        operation.firstNumber += value;
      } else {
        operation.secondNumber += value;
      }
      displayValue(value, 'add')
    }
    console.log(operation)
  })
})
