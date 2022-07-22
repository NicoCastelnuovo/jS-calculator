const current = document.querySelector('.current');
const buttonNodeList = document.querySelectorAll('.button');

let expression = {
  firstNumber: '',
  operator: '',
  secondNumber: '',
};

const operate = (expression) => {
  expression.firstNumber = eval(`${expression.firstNumber}${expression.operator}${expression.secondNumber}`);
  expression.operator = '';
  expression.secondNumber = '';
  return expression.firstNumber;
}

const displayValue = (value, format) => {
  if (format == 'add') {
    if (current.textContent == '0') {
      return current.textContent = value;
    }
    return current.textContent += value;
  }
  else if (format == 'changeTheLast') {
    return current.textContent = current.textContent.slice(0, current.textContent.length - 1) + value;
  }
  return current.textContent = value;
}

const clear = () => {
  expression.firstNumber = '';
  expression.operator = '';
  expression.secondNumber = '';
}

buttonNodeList.forEach(item => {
  item.addEventListener('click', () => {
    const value = item.textContent;
    if (value == 'C') {
      clear();
      displayValue('0');
    }

    else if (value == '=') {
      if (expression.firstNumber != '') { // if the equal is clicked before everything
        operate(expression);
        displayValue(expression.firstNumber);
      }
    }

    else if (['+', '-', '*', '/'].indexOf(value) != -1) {
      if (expression.firstNumber != '') { // if a sign is clicked before everything
        if (expression.operator == '') {
          expression.operator = value;
          displayValue(value, 'add')
        }
        else if (expression.secondNumber == '') {
          expression.operator = value;
          displayValue(value, 'changeTheLast')
        }
        else {
          operate(expression); // return the result
          displayValue(operate(expression) + value); // display result + new sign
          expression.operator = value; // add the new sign in the expression obj
        }
      }
    }

    else {
      if (expression.operator == '') {
        expression.firstNumber += value;
      }
      else {
        expression.secondNumber += value;
      }
      displayValue(value, 'add');
    }
    console.log(expression)
  })
})
