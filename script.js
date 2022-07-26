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
  let totalLength = (expression.firstTerm + expression.secondTerm).length;
  if (totalLength > 10 && (expression.firstTerm + expression.secondTerm).includes('.')) {
    expression.firstTerm = eval(`${expression.firstTerm}${expression.operator}${expression.secondTerm}`).toFixed(6);
  }
  else {
    expression.firstTerm = eval(`${expression.firstTerm}${expression.operator}${expression.secondTerm}`).toString();
  }
  expression.operator = '';
  expression.secondTerm = '';
  expression.evaluated = true;
  return expression.firstTerm;
}

/* ------------------- DISPLAY FUNCTION ------------------- */
const displayValue = (display) => {
  if (display[1] == 'add') {
    current.textContent += display[0];
  }
  else if (display[1] == 'changeTheLast') {
    current.textContent = removeLastDigit(current.textContent) + display[0];
  }
  else if (display[1] == 'removeTheLast') {
    current.textContent = removeLastDigit(current.textContent);
  }
  else if (display[0] == 'Infinity' || display[0] == undefined || display[0] == 'NaN') {
    current.textContent = 'ERROR';
  }
  else {
    current.textContent = display[0];
  }
  return current.textContent;
}

/* ------------------- REUSABLE FUNCTIONS ------------------- */

const removeLastDigit = (n) => {
  return n = n.slice(0, n.length - 1);
}

/* ------------------- HANDLERS ------------------- */
const handleClear = () => {
  expression.firstTerm = '';
  expression.operator = '';
  expression.secondTerm = '';
  expression.evaluated = false;
  display = [''];
}

const handleBackspace = () => {
  if (!expression.operator) {
    if (expression.firstTerm == 'Infinity' || expression.firstTerm == 'NaN') {
      expression.firstTerm = '';
      expression.evaluated = false;
      display= [''];
    }
    else {
      expression.firstTerm = removeLastDigit(expression.firstTerm);
      display = ['', 'removeTheLast'];
    }
  }
  else if (expression.operator) {
    if (!expression.secondTerm) {
      expression.operator = removeLastDigit(expression.operator);
      display = ['', 'removeTheLast'];

    }
    else {
      expression.secondTerm = removeLastDigit(expression.secondTerm);
      display = ['', 'removeTheLast'];
    }
  }
}

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

const handleOperators = (value) => {
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
      if (expression.firstTerm == 'Infinity' || expression.firstTerm == 'NaN') {
        expression.firstTerm = '0';
        expression.operator = value;
        display = ['0' + value]
      }
      else {
        expression.operator = value;
        display = [value, 'add'];
      }
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

const handleDecimalPoint = (value) => {
  // decimal toggle function
  if (!expression.operator) { // first term decimal
    if (expression.evaluated === true) { // decimal behavior after equals: add it like operators
      expression.evaluated = false;
    }
    // handleDecimalPoint(expression.firstTerm);
    if (expression.firstTerm == '') {
      expression.firstTerm += '0' + value;
      display = ['0' + value, 'add'];
    }
    else if (expression.firstTerm == 'Infinity' || expression.firstTerm == 'NaN') {
      expression.firstTerm = '0' + value;
      display = ['0' + value];
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

const handleNumbers = (value) => {
  if (!expression.operator) { // firstTerm digiting rules
    if (expression.firstTerm == '0' || expression.firstTerm == '') {
      expression.firstTerm = value; // managing the zero at the beginning
      display = [value];
    }
    else if (expression.evaluated === true) { // behavior right after evaluation: clear
      handleClear();
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
      handleClear();
    }
    else if (value == '<<') {
      handleBackspace();
    }
    else if (value == '=') {
      handleEquals();
    }
    else if (['+', '-', '*', '/'].includes(value)) {
      handleOperators(value);
    }
    else if (value == '.') {
      handleDecimalPoint(value);
    }
    else {
      handleNumbers(value);
    }
    displayValue(display);
    console.log(expression)
  })
})

/* ------------------- DARK MODE ------------------- */
const darkMode = document.querySelector('.dark-mode');
const calculatorBody = document.querySelector('.calculator-body');
const body = document.querySelector('body');
const iconDarkMode = document.querySelector('.dark-mode>img')

darkMode.addEventListener('click', () => {
  body.classList.toggle('dark-body');
  calculatorBody.classList.toggle('dark-calculator');
  buttonNodeList.forEach(item => {
    item.classList.toggle('dark-button');
  })
  darkMode.classList.toggle('dark-button')
  if (iconDarkMode.getAttribute('src') == './images/moon.svg') {
    iconDarkMode.setAttribute('src', './images/sun.svg');
    iconDarkMode.classList.add('change-icon-color');
  } else {
    iconDarkMode.setAttribute('src', './images/moon.svg');
    iconDarkMode.classList.remove('change-icon-color');
  }
});

/* ------------------- ON / OFF ------------------- */
const switchOnOff = document.querySelector('.switchOnOff');
const screen = document.querySelector('.screen');

switchOnOff.addEventListener('click', () => {
  buttonNodeList.forEach(item => {
    if (item.disabled == false) {
      if (item.textContent == 'c') {
        item.click();
      }
      screen.classList.add('off');
      current.classList.add('off');
      item.disabled = true;
    } else {
      screen.classList.remove('off');
      current.classList.remove('off');
      item.disabled = false;
    }
  })
})