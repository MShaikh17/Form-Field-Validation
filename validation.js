// Global validation status for tracking field validity
let validName = false;
let validEmail = false;
let validCard = false;

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners for validation
  document.getElementById("fullName").addEventListener("blur", validateName);
  document.getElementById("email").addEventListener("blur", validateEmail);
  document.getElementById("cardNumber").addEventListener("blur", validateCard);
  document
    .getElementById("courseBookingForm")
    .addEventListener("submit", validateForm);
});

//Validates the name field using regex
// Must be in format: First Last (capital first letters)
function validateName() {
  const nameInput = document.getElementById("fullName");
  const nameError = document.getElementById("nameError");
  const nameRegex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;

  if (nameRegex.test(nameInput.value)) {
    nameError.textContent = "";
    nameInput.style.borderColor = "#ccc";
    validName = true;
  } else {
    nameError.textContent = "Please enter a valid name (e.g. John Doe)";
    nameInput.style.borderColor = "#e70064";
    validName = false;
  }

  return validName;
}

//Validates the email field using the built-in HTML validation and additional checks
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  // Email regex pattern: username@domain.tld
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(emailInput.value)) {
    emailError.textContent = "";
    emailInput.style.borderColor = "#ccc";
    validEmail = true;
  } else {
    emailError.textContent =
      "Please enter a valid email address (e.g. test@abc.com)";
    emailInput.style.borderColor = "#e70064";
    validEmail = false;
  }

  return validEmail;
}

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

///Validates the entire form before submission
//Triggers mailto: if all fields are valid
function validateForm(event) {
  event.preventDefault();

  // Validate all fields again to ensure they're all valid
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isCardValid = validateCard();

  // Check if all validations passed
  if (isNameValid && isEmailValid && isCardValid) {
    const name = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const card = document.getElementById("cardNumber").value;

    // Create mailto link with form data
    const subject = encodeURIComponent("Course Booking Form Submission");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCard Number: ${card}`
    );

    window.location.href = `mailto:challenge@dn-uk.com?subject=${subject}&body=${body}`;
    return true;
  } else {
    // Show all validation errors
    validateName();
    validateEmail();
    validateCard();
    return false;
  }
}
