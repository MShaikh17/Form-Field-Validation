# Form Field Validation

A simple form for user to input information, with validation for username, email and credit card number.
<br> 
</br>


## Description

Developed a secure user registration interface implementing validation with JavaScript.
Used a custom implementation of the Luhn algorithm for the credit card verification.

Below is the image of the form container when program is run

![image](https://github.com/user-attachments/assets/7e5c6b90-857b-4ab6-b6e5-be251e9a3dad)


These are the error messages that appear when input is incorrect.

![image](https://github.com/user-attachments/assets/909f651e-9e87-4729-bde2-b0d2dd58a1c3)


Luhns Algorithm is a formula used in the validation of identification numbers.
It works by performing mathematical operations on the digits, doubling every second digit from the right and summing all digits,
with the total needing to be divisible by 10 for the number to be valid:
<br></br>

```js
  // Validates credit card number using Luhn algorithm
function validateCard() {
  const cardInput = document.getElementById("cardNumber");
  const cardError = document.getElementById("cardError");
  const cardNumber = cardInput.value.trim();

  // Step 1: Check length (16 digits)
  if (cardNumber.length != 16) {
    cardError.textContent = "Card number must be 16 digits";
    cardInput.style.borderColor = "#e70064";
    validCard = false;
    return validCard;
  }

  // Step 2: Check that only numbers are entered
  if (!/^\d+$/.test(cardNumber)) {
    cardError.textContent = "Card number must contain only digits";
    cardInput.style.borderColor = "#e70064";
    validCard = false;
    return validCard;
  }

  // Step 3: Check that sum is not 0
  let digitSum = 0;
  for (let i = 0; i < cardNumber.length; i++) {
    digitSum += parseInt(cardNumber.charAt(i));
  }

  if (digitSum === 0) {
    cardError.textContent = "Invalid card number (sum cannot be 0)";
    cardInput.style.borderColor = "#e70064";
    validCard = false;
    return validCard;
  }

  // Steps 4-6: Luhn algorithm
  let checksum = 0;
  let isSecond = false;

  // Start from the rightmost digit and work left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));

    // Step 4: Double every second digit
    if (isSecond) {
      digit *= 2;

      // Step 5: If doubling results in two-digit number, add digits
      if (digit > 9) {
        digit = Math.floor(digit / 10) + (digit % 10);
      }
    }

    // Step 6: Sum all digits
    checksum += digit;

    isSecond = !isSecond;
  }

  // Step 7: Check if sum is divisible by 10
  if (checksum % 10 === 0) {
    cardError.textContent = "";
    cardInput.style.borderColor = "#ccc";
    validCard = true;
  } else {
    cardError.textContent = "Invalid card number (checksum failed)";
    cardInput.style.borderColor = "#e70064";
    validCard = false;
  }

  return validCard;
}
```

