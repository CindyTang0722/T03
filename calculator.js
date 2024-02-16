document.addEventListener('DOMContentLoaded', function() {
  // Variables for calculator functionality
  let displayValue = '0'; // Current value displayed on the calculator
  let firstOperand = null; // First operand for calculations
  let operator = null; // Operator for calculations
  let awaitingNextOperand = false; // Flag to check if next operand is awaited

  // Display value on the calculator
  const display = document.getElementById('displayValue');
  display.textContent = displayValue;

  // Function to update the display
  function updateDisplay() {
    display.textContent = displayValue;
  }

  // Function to handle number button clicks
  function inputDigit(digit) {
    if (awaitingNextOperand) {
      displayValue = digit;
      awaitingNextOperand = false;
    } else {
      displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  }

  // Function to handle decimal point button click
  function inputDecimal() {
    if (!displayValue.includes('.')) {
      displayValue += '.';
    }
  }

  // Function to handle operator button clicks
  function handleOperator(nextOperator) {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      firstOperand = inputValue;
    } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);
      displayValue = String(result);
      firstOperand = result;
    }

    awaitingNextOperand = true;
    operator = nextOperator;
  }

  // Object to perform calculations based on the operator
  const performCalculation = {
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    'x': (firstOperand, secondOperand) => firstOperand * secondOperand,
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
    '=': (firstOperand, secondOperand) => secondOperand,
  };

  // Function to reset the calculator
  function resetCalculator() {
    displayValue = '0';
    firstOperand = null;
    operator = null;
    awaitingNextOperand = false;
  }

  // Event listeners for number buttons
  const numberButtons = document.querySelectorAll('.number');
  numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      inputDigit(button.textContent);
      updateDisplay();
    });
  });

  // Event listener for decimal point button
  const decimalButton = document.getElementById('decimal');
  decimalButton.addEventListener('click', () => {
    inputDecimal();
    updateDisplay();
  });

  // Event listeners for operator buttons
  const operatorButtons = document.querySelectorAll('.operator');
  operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      handleOperator(button.textContent);
      updateDisplay();
    });
  });

  // Event listener for equals button
  const equalsButton = document.getElementById('equals');
  equalsButton.addEventListener('click', () => {
    handleOperator('=');
    updateDisplay();
  });

  // Event listener for clear button
  const clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', () => {
    resetCalculator();
    updateDisplay();
  });
});
