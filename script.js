/* ------------------- SELECT ELEMENTS ------------------- */
const current = document.querySelector('.current');
const buttonNodeList = document.querySelectorAll('.button');

/* ------------------- GLOBALS ------------------- */
let expression = {
  a: '',
  operator: '', 
  b: '',
  evaluated: false
}
let display = '';

/* ------------------- BASIC MATH FUNCTIONS ------------------- */
const sum = (a, b) => {
  return a + b;
}
const subtract = (a, b) => {
  return a - b;
}
const multiply = (a, b) => {
  return a * b;
}
const divide = (a, b) => {
  if (a / b == 'Infinity') {
    return 'Error';
  }
  return a / b;
}

/* ------------------- OPERATE FUNCTION ------------------- */
const operate = (expression) => {
  let a = parseFloat(expression.a)
  let b = parseFloat(expression.b)
  let result;
  if (!a) { return 'Error'}
  if (!b) { return 'Error'}
  if (expression.operator == '+') {
    result = sum(a, b);
  } 
  else if (expression.operator == '-') {
    result = subtract(a, b);
  }
  else if (expression.operator == '*') {
    result = multiply(a, b);
  }
  else if (expression.operator == '/') {
    result = divide(a, b);
  }
  if (result % 1 != 0) {
    return parseFloat(result.toFixed(4));
  }
  return result;
};

// const updateDisplay = (value) => {
//   current.textContent = value;
// }
const updateDisplay = () => {
  current.textContent = expression.a + expression.operator + expression.b;
}

const removeLastDigit = (n) => {
  return n.slice(0, n.length - 1);
}

const checkError = () => {
  if (expression.a == 'Error') {
    clear();
  }
}

const clear = () => {
  expression = {
    a: '',
    operator: '', 
    b: '',
    evaluated: false
  }
  display = '';
}

const handleBackspace = () => {
  if (!expression.operator) {
    expression.a = removeLastDigit(expression.a);
  }
  else {
    if (!expression.b) {
      expression.operator = removeLastDigit(expression.operator);
    }
    else {
      expression.b = removeLastDigit(expression.b);
    }
  }
  display = removeLastDigit(display);
}

const handleOperators = (value) => {
  if (!expression.a) {
    return ;
  }
  else if (!expression.operator) {
    expression.evaluated = false;
    expression.operator = value;
    display += value;
  }
  else {
    if (!expression.b) {
      expression.operator = value;
      display = removeLastDigit(display) + value;
    }
    else {
      if (expression.b == '0') {
        expression.a = operate(expression).toString();
        display = expression.a;
      }
      else {
        expression.a = operate(expression).toString();
        expression.b = '';
        display = expression.a + value;
        expression.operator = value;
      }
    }
  }
}

const handleDecimalPoint = () => {
  if (!expression.operator) {
    if (expression.evaluated == true) {
      if (!expression.a.includes('.')) {
        expression.evaluated = false;
      }
    }
    if (expression.a[expression.a.length - 1] == '.') {
      expression.a = removeLastDigit(expression.a);
    }
    else if (!expression.a) {
      expression.a = '0.';
    }
    else {
      if (!expression.a.includes('.')) {
        expression.a += '.';
      }
      else {
        return ;
      }
    }
  }
  else {
    if (expression.b[expression.b.length - 1] == '.') {
      expression.b = removeLastDigit(expression.b);
    }
    else if (!expression.b) {
      expression.b = '0.';
    }
    else {
      if (!expression.b.includes('.')) {
        expression.b += '.';
      }
      else {
        return ;
      }
    }
  }
}

const handleEquals = () => {
  if (!expression.b) {
    return ;
  }
  else {
    expression.a = operate(expression).toString();
    expression.operator = '';
    expression.b = '';
    expression.evaluated = true;
  }
}

const handleNumbers = (value) => {
  if (expression.evaluated == true) {
    clear();
  }
  if (!expression.operator) {
    if (expression.a == '0') {
      expression.a = value;
    }
    else {
      expression.a += value;
    }
  }
  else {
    if (expression.b == '0') {
      expression.b = value;
    }
    else {
      expression.b += value;
    }
  }
}

/* ------------------- MAIN FUNCTION ------------------- */
buttonNodeList.forEach(item => {
  document.body.addEventListener('keydown', (e) => {
    if (e.key == item.textContent) {
      item.click();
    }
  })
  item.addEventListener('click', (e) => {
    let value = e.target.value;
    checkError();
    if (value == 'c') {
      clear();
    }
    else if (value == '_') { // value for backspace
      handleBackspace();
    }
    else if (['+', '-', '*', '/'].includes(value)) {
      handleOperators(value);
    }
    else if (value == '.') {
      handleDecimalPoint();
    }
    else if (value == '=') {
      handleEquals();
    }
    else {
      handleNumbers(value);
    }
    console.log(expression)
    updateDisplay();
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
