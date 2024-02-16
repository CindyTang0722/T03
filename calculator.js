document.addEventListener('DOMContentLoaded', function() {
  // Get the display element
  const display = document.getElementById('displayValue');

  // Get all number keys
  const numberKeys = document.querySelectorAll('.number');

  // Get all operator keys
  const operatorKeys = document.querySelectorAll('.operator');

  // Get the decimal key
  const decimalKey = document.getElementById('decimal');

  // Get the equals key
  const equalsKey = document.getElementById('equals');

  // Get the clear key
  const clearKey = document.getElementById('clear');

  // Variable to store the current number
  let currentNumber = '';

  // Variable to store the previous operator
  let previousOperator = '';

  // Function to update the display
  function updateDisplay(value) {
    display.textContent = value;
  }

  // Event listener for number keys
  numberKeys.forEach(function(numberKey) {
    numberKey.addEventListener('click', function() {
      const number = this.textContent;
      currentNumber += number;
      updateDisplay(currentNumber);
    });
  });

  // Event listener for decimal key
  decimalKey.addEventListener('click', function() {
    if (!currentNumber.includes('.')) {
      currentNumber += '.';
      updateDisplay(currentNumber);
    }
  });

  // Event listener for operator keys
  operatorKeys.forEach(function(operatorKey) {
    operatorKey.addEventListener('click', function() {
      const operator = this.textContent;

      if (previousOperator !== '') {
        // Perform the calculation for the previous operator
        const result = calculate(previousOperator, parseFloat(currentNumber));
        currentNumber = result.toString();
        updateDisplay(currentNumber);
      }

      previousOperator = operator;
      currentNumber = '';
    });
  });

  // Event listener for equals key
  equalsKey.addEventListener('click', function() {
    if (previousOperator !== '') {
      // Perform the calculation for the previous operator
      const result = calculate(previousOperator, parseFloat(currentNumber));
      currentNumber = result.toString();
      updateDisplay(currentNumber);
      previousOperator = '';
    }
  });

  // Event listener for clear key
  clearKey.addEventListener('click', function() {
    currentNumber = '';
    previousOperator = '';
    updateDisplay('0');
  });

  // Function to perform the calculation
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
  // Initialize the display
  updateDisplay();
});
