// Assignment code here


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

var generatePassword = function () {
  // prompt for the length of the password
  // choose a length of at least 8 characters and no more than 128 characters
  var passwordLength = window.prompt("Please choose a password length. Choose at least 8 characters and no more than 128 characters.");
  // convert passwordLength to number. Will return NaN if not a number
  passwordLength = parseInt(passwordLength);
  // validate that passwordLength is a number and is between 8 and 128 inclusive
  while (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128){
    passwordLength = window.prompt("That is not a valid input. Please choose a number of at least 8 and no more than 128.");
  }
  
  // prompt for character types to include in the password
  // choose lowercase, uppercase, numeric, and/or special characters

  // input should be validated and at least one character type should be selected
  
}

// Add event listener to generate button. Call writePassword on click
generateBtn.addEventListener("click", writePassword);
