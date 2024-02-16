document.addEventListener('DOMContentLoaded', function() {
  // Get references to the elements
  var displayValueElement = document.getElementById('displayValue');
  var keys = document.getElementById('pad');

  let currentValue = '0'; // Stores the current value displayed on the calculator
  let operator = ''; // Stores the selected operator
  let previousValue = ''; // Stores the previous value entered before selecting an operator

  // Update the display value
  function updateDisplay() {
    displayValueElement.textContent = currentValue;
  }

  // Add event listeners to number buttons
  for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', function() {
      const number = numberButtons[i].textContent;
      if (currentValue === '0' || operator !== '') {
        currentValue = number;
      } else {
        currentValue += number;
      }
      operator = '';
      updateDisplay();
    });
  }

  // Add event listeners to operator buttons
  for (let i = 0; i < operatorButtons.length; i++) {
    operatorButtons[i].addEventListener('click', function() {
      operator = operatorButtons[i].textContent;
      previousValue = currentValue;
      currentValue = '0';
      updateDisplay();
    });
  }

  // Add event listener to the equals button
  equalsButton.addEventListener('click', function() {
    if (operator !== '') {
      const result = calculateResult(parseFloat(previousValue), operator, parseFloat(currentValue));
      currentValue = result.toString();
      operator = '';
      previousValue = '';
      updateDisplay();
    }
  });

  // Add event listener to the clear button
  clearButton.addEventListener('click', function() {
    currentValue = '0';
    operator = '';
    previousValue = '';
    updateDisplay();
  });

  // Perform calculation based on operator and operands
  function calculateResult(num1, operator, num2) {
    switch (operator) {
      case '+':
        return num1 + num2;
      case '-':
        return num1 - num2;
      case 'x':
        return num1 * num2;
      case '/':
        return num1 / num2;
      default:
        return 0;
    }
  }

  // Initialize the display
  updateDisplay();
});
