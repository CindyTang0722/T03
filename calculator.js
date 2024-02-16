document.addEventListener('DOMContentLoaded', function() {
  // Get references to the elements
  const displayValueElement = document.getElementById('displayValue');
  const numberButtons = document.getElementsByClassName('number');
  const operatorButtons = document.getElementsByClassName('operator');
  const equalsButton = document.getElementById('equals');
  const clearButton = document.getElementById('clear');

  let currentValue = '';
  let previousValue = '';
  let selectedOperator = null;

  function updateDisplay() {
    displayValueElement.textContent = currentValue;
  }

  function clear() {
    currentValue = '';
    previousValue = '';
    selectedOperator = null;
    updateDisplay();
  }

  function appendNumber(number) {
    if (number === '.' && currentValue.includes('.')) {
      return; // Prevent adding multiple decimal points
    }

    currentValue += number;
    updateDisplay();
  }

  function selectOperator(operator) {
    if (currentValue === '') {
      return; // Prevent selecting operator without a number
    }

    if (previousValue !== '') {
      calculateResult();
    }

    selectedOperator = operator;
    previousValue = currentValue;
    currentValue = '';
    updateDisplay();
  }

  function calculateResult() {
    let result = 0;
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);

    if (isNaN(num1) || isNaN(num2)) {
      return; // Prevent calculation if values are not valid numbers
    }

    switch (selectedOperator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case 'x':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        return; // Prevent calculation if operator is not valid
    }

    currentValue = result.toString();
    selectedOperator = null;
    previousValue = '';
    updateDisplay();
  }

  // Add event listeners to number buttons
  for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
      const number = numberButtons[i].textContent;
      appendNumber(number);
    });
  }

  // Add event listeners to operator buttons
  for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
      const operator = operatorButtons[i].textContent;
      selectOperator(operator);
    });
  }

  // Add event listener to the equals button
  equalsButton.addEventListener('click', function() {
    calculateResult();
  });

  // Add event listener to the clear button
  clearButton.addEventListener('click', function() {
    clear();
  });
});
  // Initialize the display
  updateDisplay();
});
