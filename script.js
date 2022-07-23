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
    expression.firstNumber = eval(`${expression.firstNumber}${expression.operator}${expression.secondNumber}`);
    expression.operator = '';
    expression.secondNumber = '';
    expression.evaluated = true
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
  display = '0'
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
    display = '0';
  }
  return display;
}

const handleOperators = () => {

}

/* ------------------- CLICK LISTENER ------------------- */
buttonNodeList.forEach(item => {
  item.addEventListener('click', () => {
    const value = item.textContent;
    if (value == 'C') {
      clear();
    }

    else if (value == '=') {
      handleEquals();
    }

    else if (['+', '-', '*', '/'].includes(value)) {
      // handleOperators();
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
        display = '0';
      }
    }

    else if (expression.firstNumber == '0' || expression.firstNumber == '') { // particular cas of the first digited
      if (value == '0') { // do nothing, refresh only display
        display = [value, 'changeTheLast'];
      }
      else { // do like any other number
        if (!expression.operator) {
          expression.firstNumber = value;
          display = [value, 'changeTheLast'];
        }
      }
    }

    else if (expression.secondNumber == '0') {
      if (value == '0') { // do nothing, refresh only display
        display = [value, 'changeTheLast'];
      }
      else { // do like any other number
        if (expression.operator) {
          expression.secondNumber = value;
          display = [value, 'changeTheLast'];
        }
      }
    }

    else {
      if (!expression.operator) {
        if (expression.evaluated === true) {
          clear();
          expression.firstNumber = value;
          display = [value];
        } else {
          expression.firstNumber += value;
          display = [value, 'add'];
        }
      }
      else if (expression.operator) {
        expression.secondNumber += value;
        display = [value, 'add'];
      }
    }

    displayValue(display);
    console.log(expression)
  })
})
