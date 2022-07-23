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
  let textContent = current.textContent;
  if (display[1] == 'add') {
    if (current.textContent == '0') {
      return current.textContent = display[0];
    }
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
}

/* ------------------- CLICK LISTENER ------------------- */
buttonNodeList.forEach(item => {
  item.addEventListener('click', () => {
    const value = item.textContent;
    let display;
    if (value == 'C') {
      clear();
      display = '0';
    }

    else if (value == '=') {
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
    }

    else if (['+', '-', '*', '/'].indexOf(value) != -1) {
      if (expression.firstNumber) { // if the firstNumber is already set
        if (!expression.operator) {
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

    // else if (value == '.') {
    //   if (expression.operator == '') {
    //     if (expression.firstNumber.indexOf('.') == -1) {
    //       expression.firstNumber += value;
    //       display = [value, 'add'];
    //     }
    //   } 
    //   else if (expression.operator != '') {
    //     if (expression.secondNumber.indexOf('.') == -1) {
    //       expression.secondNumber += value;
    //       display = [value, 'add'];
    //     } 
    //   }
    // }

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
      else {
        expression.secondNumber += value;
        display = [value, 'add'];
      }
    }

    displayValue(display);
    console.log(expression)
  })
})
