/* ------------------- SELECT ELEMENTS ------------------- */
const current = document.querySelector('.current');
const buttonNodeList = document.querySelectorAll('.button');

/* ------------------- GLOBAL VARIABLES ------------------- */
let expression = {
  firstNumber: '',
  operator: '',
  secondNumber: '',
  evaluated: false
};
let display = '0';

/* ------------------- MATH OPERATION ------------------- */
const operate = (expression) => {
    expression.firstNumber = eval(`${expression.firstNumber}${expression.operator}${expression.secondNumber}`).toString();
    expression.operator = '';
    expression.secondNumber = '';
    expression.evaluated = true;
    return expression.firstNumber;
}

/* ------------------- DISPLAY FUNCTION ------------------- */
const displayValue = (display) => {
  if (display[1] == 'add') {
    return current.textContent += display[0];
  }
  else if (display[1] == 'changeTheLast') {
    return current.textContent = current.textContent.slice(0, current.textContent.length - 1) + display[0];
  }
  else if (display[1] == 'removeTheLast') {
    return current.textContent = current.textContent.slice(0, current.textContent.length - 1);
  }
  else if (display[0] == 'Infinity' || display[0] == undefined) {
    return current.textContent = 'ERROR';
  }
  return current.textContent = display[0];
}

/* ------------------- RESET FUNCTION ------------------- */
const clear = () => {
  expression.firstNumber = '';
  expression.operator = '';
  expression.secondNumber = '';
  expression.evaluated = false;
  display = ['0'];
}

/* ------------------- CLICK HANDLERS ------------------- */
const handleEquals = () => {
  if (expression.firstNumber) { // if the firstNumber is not empty
    if (expression.operator) { // if the operator is set
      if (!expression.secondNumber) { // but the secondNumber is not set
        expression.operator = '' // then remove the last operator
      } 
    }
    operate(expression);
    display = [operate(expression)];
  }
  else { // if equals is pressed before everything or after a clear
    display = ['0'];
  }
  return display;
}

const handleOperators = () => {

}

/* ------------------- EVENT LISTENER ------------------- */
buttonNodeList.forEach(item => {
  document.body.addEventListener('keydown', (e) => {
    if (e.key == item.textContent) {
      item.click();
    }
  })
  item.addEventListener('click', () => {
    const value = item.textContent;
    if (value == 'c') {
      clear();
    }

    else if (value == '=') {
      handleEquals();
    }

    else if (['+', '-', '*', '/'].includes(value)) {
      // handleOperators();
      if (expression.firstNumber[expression.firstNumber.length - 1] == '.') {
        expression.firstNumber = expression.firstNumber.slice(0, expression.firstNumber.length - 1);
        displayValue(['', 'removeTheLast']);
      }
      if (expression.firstNumber) { // if the firstNumber is already set
        if (!expression.operator) { // if the operator is not set yet
          expression.operator = value;
          display = [value, 'add'];
        }
        else if (!expression.secondNumber) { // if we are selecting the operator multiple times
          expression.operator = value;
          display = [value, 'changeTheLast']
        }
        else { // if I set the secondNumber and press another or the same operator
          operate(expression); // return the result of the expression
          display = [operate(expression) + value]; // save for display
          expression.operator = value; // add the new sign in the expression obj
        }
      }
      else if (!expression.firstNumber) { // if the firstNumber is not set yet
        display = ['', 'add'];
      }
    }

    else if (value == '.') {
      // decimal toggle function
      if (!expression.operator) { // first term decimal
        if (expression.evaluated === true) { // decimal behavior after equals: like operators
          expression.evaluated = false;
        }
        if (expression.firstNumber == '') {
          expression.firstNumber += '0' + value;
          display = [value, 'add'];
        }
        else if (!expression.firstNumber.includes(value)) {
          expression.firstNumber += value;
          display = [value, 'add'];
        }
        else {
          if (expression.firstNumber[expression.firstNumber.length - 1] == '.') { // remove the last ony if it's the dot
            expression.firstNumber = expression.firstNumber.slice(0, expression.firstNumber.length - 1);
            display = ['', 'removeTheLast'];
          }
          else {
            display = ['', 'add'];
          }
        }
      }
      else { // second term decimal (SAME FUNCTION, MERGE)
        if (expression.secondNumber == '') {
          display = ['', 'add'];
        }
        else if (!expression.secondNumber.includes(value)) {
          expression.secondNumber += value;
          display = [value, 'add'];
        }
        else {
          if (expression.secondNumber[expression.secondNumber.length - 1] == '.') { // remove the last ony if it's the dot
            expression.secondNumber = expression.secondNumber.slice(0, expression.secondNumber.length - 1);
            display = ['', 'removeTheLast'];
          }
          else {
            display = ['', 'add'];
          }
        }
      }
    }

    else {
      if (!expression.operator) { // firstNumber digiting rules
        if (expression.firstNumber == '0' || expression.firstNumber == '') {
          expression.firstNumber = value; // managing the zero at the beginning
          display = [value];
        }
        else if (expression.evaluated === true) { // behavior right after evaluation: clear
          clear();
          expression.firstNumber = value;
          display = [value];
        }
        else {
          expression.firstNumber += value;
          display = [value, 'add'];
        }
      }
      else if (expression.operator) { // secondNumber digiting rules
        if (expression.secondNumber == '0') {
          expression.secondNumber = value; // managing the zero at the beginning
          display = [value, 'changeTheLast'];
        }
        else {
          expression.secondNumber += value;
          display = [value, 'add'];
        }
      }
    }
    displayValue(display);
    console.log(expression)
  })
})
