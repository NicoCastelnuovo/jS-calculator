/* ------------------- SELECT ELEMENTS ------------------- */
const current = document.querySelector('.current');
const buttonNodeList = document.querySelectorAll('.button');

/* ------------------- GLOBAL VARIABLES ------------------- */
let expression = {
  a: '',
  operator: '', 
  b: '',
  evaluated: false,
}

/* ------------------- MATH FUNCTIONS ------------------- */
const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b == 'Infinity' ? 'Error' : a / b;

const operate = (expression) => {
  let a = parseFloat(expression.a)
  let b = parseFloat(expression.b)
  let result;
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
  result = result || 0;
  if (result != 'Error') {
    if (result % 1 != 0) {
      return parseFloat(result.toFixed(4));
    }
  }
  return result;
};

/* -------------- HANDLERS & REUSABLE FUNCTIONS -------------- */
const updateDisplay = () => {
  current.textContent = expression.a + expression.operator + expression.b;
};

const removeLastDigit = (n) => {
  return n.slice(0, n.length - 1);
};

const checkError = () => {
  expression.a == 'Error' ? clear() : null;
};

const clear = () => {
  expression = {
    a: '',
    operator: '', 
    b: '',
    evaluated: false,
  }
};

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
}

const handleOperators = (value) => {
  if (!expression.a) {
    return ;
  }
  else {
    if (!expression.operator) {
      expression.evaluated = false;
    }
    else {
      if (!expression.b) {
        expression.operator = value;
      }
      else {
        expression.a = operate(expression).toString();
        expression.b = '';
      }
    }
    if (expression.a == 'Error') {
      expression.operator = '';
    }
    else {
      expression.operator = value;
    }
  }
}

const handleDecimalPoint = (expressionTerm) => {
  if (expressionTerm[expressionTerm.length - 1] == '.') {
    return expressionTerm = removeLastDigit(expressionTerm);
  }
  else if (!expressionTerm) {
    return expressionTerm = '0.';
  }
  else {
    if (!expressionTerm.includes('.')) {
      return expressionTerm += '.';
    }
    else {
      return expressionTerm;
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

const handleNumbers = (value, expressionTerm) => {
  if (expressionTerm == '0') {
    expressionTerm = value;
  }
  return expressionTerm += value;
}

const handleKeyboardSupport = (e, item) => {
  if (e.key == 'c') {
    if (item.textContent == 'C') {
      item.click();
    }
  }
  else if (e.key == 'Backspace' || e.key == '<') {
    if (item.textContent == '<') {
      item.click();
    }
  }
  else {
    if (e.key == item.textContent) {
      item.click();
    }
  }
}

const handleClick = (value) => {
  checkError();
  if (value == 'c') {
    clear();
  }
  else if (value == '_') {
    handleBackspace();
  }
  else if (['+', '-', '*', '/'].includes(value)) {
    handleOperators(value);
  }
  else if (value == '.') {
    if (!expression.operator) {
      if (expression.evaluated == true) {
        if (!expression.a.includes('.')) {
          expression.evaluated = false;
        }
      }
      expression.a = handleDecimalPoint(expression.a);
    }
    else {
      expression.b = handleDecimalPoint(expression.b);
    }
  }
  else if (value == '=') {
    handleEquals();
  }
  else {
    if (expression.evaluated == true) {
      clear();
    }
    if (!expression.operator) {
      expression.a = handleNumbers(value, expression.a);
    }
    else {
      expression.b = handleNumbers(value, expression.b);
    }
  }
  updateDisplay();
}

/* ------------------- MAIN FUNCTION ------------------- */
buttonNodeList.forEach(item => {
  window.addEventListener('keydown', (e) => {
    handleKeyboardSupport(e, item);
  })
  item.addEventListener('click', (e) => {
    handleClick(e.target.value, item);
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
