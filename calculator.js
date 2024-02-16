document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('displayValue');

    const numberKeys = document.querySelectorAll('.number');
  
    const operatorKeys = document.querySelectorAll('.operator');
  
    const decimalKey = document.getElementById('decimal');
  
    const equalsKey = document.getElementById('equals');
  
    const clearKey = document.getElementById('clear');
  
    let currentNumber = '';
  
    let previousOperator = '';
  
    function updateDisplay(value) {
      display.textContent = value;
    }
  
    numberKeys.forEach(function(numberKey) {
      numberKey.addEventListener('click', function() {
        const number = this.textContent;
        currentNumber += number;
        updateDisplay(currentNumber);
      });
    });
  
    decimalKey.addEventListener('click', function() {
      if (!currentNumber.includes('.')) {
        currentNumber += '.';
        updateDisplay(currentNumber);
      }
    });
  
    operatorKeys.forEach(function(operatorKey) {
      operatorKey.addEventListener('click', function() {
        const operator = this.textContent;
  
        if (previousOperator !== '') {
          const result = calculate(previousOperator, parseFloat(currentNumber));
          currentNumber = result.toString();
          updateDisplay(currentNumber);
        }
  
        previousOperator = operator;
        currentNumber = '';
      });
    });
  
    equalsKey.addEventListener('click', function() {
      if (previousOperator !== '') {
        const result = calculate(previousOperator, parseFloat(currentNumber));
        currentNumber = result.toString();
        updateDisplay(currentNumber);
        previousOperator = '';
      }
    });
  
    clearKey.addEventListener('click', function() {
      currentNumber = '';
      previousOperator = '';
      updateDisplay('0');
    });
  
    function calculate(operator, operand) {
      const currentValue = parseFloat(display.textContent);
  
      switch (operator) {
        case '+':
          return currentValue + operand;
        case '-':
          return currentValue - operand;
        case 'x':
          return currentValue * operand;
        case '/':
          return currentValue / operand;
      }
    }
  });