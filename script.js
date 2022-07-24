/* ------------------- SELECT ELEMENTS ------------------- */
const current = document.querySelector('.current');
const buttonNodeList = document.querySelectorAll('.button');

/* ------------------- GLOBAL VARIABLES ------------------- */
let expression = {
  firstTerm: '',
  operator: '',
  secondTerm: '',
  evaluated: false
};
let display = [''];

/* ------------------- MATH OPERATION ------------------- */
const operate = (expression) => {
    expression.firstTerm = eval(`${expression.firstTerm}${expression.operator}${expression.secondTerm}`).toString();
    expression.operator = '';
    expression.secondTerm = '';
    expression.evaluated = true;
    return '=' + expression.firstTerm;
}

/* ------------------- DISPLAY FUNCTION ------------------- */
const displayValue = (display) => {
  if (display[1] == 'add') {
    return current.textContent += display[0];
  }
  else if (display[1] == 'changeTheLast') {
    return current.textContent = removeLastDigit(current.textContent) + display[0];
  }
  else if (display[1] == 'removeTheLast') {
    return current.textContent = removeLastDigit(current.textContent);
  }
  else if (display[0] == 'Infinity' || display[0] == undefined) {
    return current.textContent = 'ERROR';
  }
  return current.textContent = display[0];
}

/* ------------------- RESET FUNCTION ------------------- */
const clear = () => {
  expression.firstTerm = '';
  expression.operator = '';
  expression.secondTerm = '';
  expression.evaluated = false;
  display = [''];
}

/* ------------------- SHARED FUNCTIONS / PATTERNS ------------------- */
const removeLastDigit = (n) => {
  return n = n.slice(0, n.length - 1);
}

/* ------------------- HANDLERS ------------------- */
const handleEquals = () => {
  if (expression.firstTerm) { // if the firstTerm is not empty
    if (expression.operator) { // if the operator is set
      if (!expression.secondTerm) { // but the secondTerm is not set
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

const handleDecimalPoint = () => {

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
      // if the last clicked was the decimal sign, remove it first
      if (expression.firstTerm[expression.firstTerm.length - 1] == '.') {
        expression.firstTerm = removeLastDigit(expression.firstTerm);
        displayValue(['', 'removeTheLast']);
      }
      if (expression.firstTerm == '') { // if the firstTerm is not set yet
        display = ['', 'add'];
      }
      else if (expression.firstTerm != '') { // if the firstTerm is already set
        if (!expression.operator) { // if the operator is not set yet
          expression.operator = value;
          display = [value, 'add'];
        }
        else if (!expression.secondTerm) { // if we are selecting the operator multiple times
          expression.operator = value;
          display = [value, 'changeTheLast']
        }
        else { // if I set the secondTerm and press operator
          operate(expression); // return the result of the expression
          display = [operate(expression) + value]; // save for display
          expression.operator = value; // add the new sign in the expression obj
        }
      }
    }

    else if (value == '.') {
      // decimal toggle function
      if (!expression.operator) { // first term decimal
        if (expression.evaluated === true) { // decimal behavior after equals: like operators
          expression.evaluated = false;
        }
        // handleDecimalPoint(expression.firstTerm);
        if (expression.firstTerm == '') {
          expression.firstTerm += '0' + value;
          display = ['0' + value, 'add'];
        }
        else if (!expression.firstTerm.includes(value)) {
          expression.firstTerm += value;
          display = [value, 'add'];
        }
        else {
          if (expression.firstTerm[expression.firstTerm.length - 1] == '.') { // remove the last ony if it's the dot
            expression.firstTerm = removeLastDigit(expression.firstTerm);
            display = ['', 'removeTheLast'];
          }
          else {
            display = ['', 'add'];
          }
        }
      }
      else { // second term decimal (SAME FUNCTION, MERGE)
        if (expression.secondTerm == '') {
          expression.secondTerm += '0' + value;
          display = ['0' + value, 'add'];
        }
        else if (!expression.secondTerm.includes(value)) {
          expression.secondTerm += value;
          display = [value, 'add'];
        }
        else {
          if (expression.secondTerm[expression.secondTerm.length - 1] == '.') { // remove the last ony if it's the dot
            expression.secondTerm = removeLastDigit(expression.secondTerm);
            display = ['', 'removeTheLast'];
          }
          else {
            display = ['', 'add'];
          }
        }
      }
    }

    else {
      if (!expression.operator) { // firstTerm digiting rules
        if (expression.firstTerm == '0' || expression.firstTerm == '') {
          expression.firstTerm = value; // managing the zero at the beginning
          display = [value];
        }
        else if (expression.evaluated === true) { // behavior right after evaluation: clear
          clear();
          expression.firstTerm = value;
          display = [value];
        }
        else {
          expression.firstTerm += value;
          display = [value, 'add'];
        }
      }
      else if (expression.operator) { // secondTerm digiting rules
        if (expression.secondTerm == '0') {
          expression.secondTerm = value; // managing the zero at the beginning
          display = [value, 'changeTheLast'];
        }
        else {
          expression.secondTerm += value;
          display = [value, 'add'];
        }
      }
    }
    displayValue(display);
    console.log(expression)
  })
})
