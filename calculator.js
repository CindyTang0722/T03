  document.addEventListener('DOMContentLoaded', function() {
  let displayValue = document.getElementById('displayValue');
  let numberButtons = document.querySelectorAll('.number');
  let operatorButtons = document.querySelectorAll('.operator');
  let equalsButton = document.getElementById('equalsButton');
  
  let previousOperator = null;
  let firstNumber = null;
  let secondNumber = null;
  let result = 0;
  
  function highlightOperatorButton(operator) {
    operatorButtons.forEach(button => {
      if (button.textContent === operator) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  
  function updateDisplayValue(value) {
    displayValue.textContent = value;
  }
  
  function clearDisplay() {
    updateDisplayValue('0');
  }
  
  function calculateResult() {
    let result;
    switch (previousOperator) {
      case '+':
        result = firstNumber + secondNumber;
        displayValue.innerHTML = result;
        break;
      case '-':
        result = firstNumber - secondNumber;
        displayValue.innerHTML = result;
        break;
      case 'x':
        result = firstNumber * secondNumber;
        displayValue.innerHTML = result;
        break;
      case '/':
        result = firstNumber / secondNumber;
        displayValue.innerHTML = result;
        break;
    }
    return result;
  }
  
  function resetCalculator() {
    previousOperator = null;
    firstNumber = null;
    secondNumber = null;
    updateDisplayValue('0');
  }
  
  // Event listener for number buttons
  numberButtons.forEach(button => {
    button.addEventListener('click', function() {
      const number = button.textContent;
  
      if (previousOperator !== null && secondNumber !== null) {
        updateDisplayValue(number);
        secondNumber = Number(displayValue.textContent);
        highlightOperatorButton(previousOperator);
      } else {
        if (displayValue.textContent === '0' || previousOperator !== null) {
          updateDisplayValue(number);
        } else {
          updateDisplayValue(displayValue.textContent + number);
        }
  
        if (previousOperator === null) {
          firstNumber = Number(displayValue.textContent);
        }
      }
  
      previousOperator = null;
    });
  });
  
  // Event listener for operator buttons
  operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
      const operator = button.textContent;
  
      if (previousOperator !== null && secondNumber !== null) {
        const result = calculateResult();
        updateDisplayValue(result);
        firstNumber = result;
        secondNumber = null;
      } else {
        firstNumber = Number(displayValue.textContent);
      }
  
      highlightOperatorButton(operator);
      previousOperator = operator;
      secondNumber = null;
    });
  });
  
  equalsButton.addEventListener('click', function() {
    if (previousOperator !== null && secondNumber !== null) {
      secondNumber = Number(displayValue.textContent); // Update secondNumber
      const result = calculateResult();
      updateDisplayValue(result);
      resetCalculator();
    } else {
      updateDisplayValue(firstNumber);
    }
  });

});

// Event listener for the reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function() {
resetCalculator();
});
