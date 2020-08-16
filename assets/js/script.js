// Assignment code here

// function to generate an array of characters given a starting character and length of the array
var generateCharsArray = function(startLetter, length){
  var charArray = [];
  var startIndex = startLetter.charCodeAt(0);
  for (i = startIndex; i < (startIndex + length); i++){
    var character = String.fromCharCode(i);
    charArray.push(character);
  }
  return charArray;
}

// generate lists of lower, upper, and numeric characters
var lowerChars = generateCharsArray("a", 26);
var upperChars = generateCharsArray("A", 26);
var numericChars = generateCharsArray("0", 10);
// generate 4 sections of special characters from ascii
var special1 = generateCharsArray(" ", 16);
var special2 = generateCharsArray(":", 7);
var special3 = generateCharsArray("[", 6);
var special4 = generateCharsArray("{", 4);
// combine special char arrays into one array
var specialChars = special1.concat(special2, special3, special4);

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
  
  // initialize variables for whether to include lowercase, uppercase, numeric, and special characters
  var includeLower = false;
  var includeUpper = false;
  var includeNumeric = false;
  var includeSpecial = false;
  // prompt for character types to include in the password
  // call getCharacters function until user chooses at least one input
  while (!includeLower && !includeUpper && !includeNumeric && !includeSpecial){
    var characterTypes = getCharacters();
    includeLower = characterTypes[0];
    includeUpper = characterTypes[1];
    includeNumeric = characterTypes[2];
    includeSpecial = characterTypes[3];
  }

  // generate a password of passwordLength including each of the character types chosen
  var password = "";

  // generate password char set based on prompts
  var passwordCharSet = [];
  // if the user wanted to include lower chars, append to passwordCharSet array
  if (includeLower){
    passwordCharSet = passwordCharSet.concat(lowerChars);
  }
  // if the user wanted to include upper chars, append to passwordCharSet array
  if (includeUpper){
    passwordCharSet = passwordCharSet.concat(upperChars);
  }
  // if the user wanted to include numeric chars, append to passwordCharSet array
  if (includeNumeric){
    passwordCharSet = passwordCharSet.concat(numericChars);
  }
  // if the user wanted to include special chars, append to passwordCharSet array
  if (includeSpecial){
    passwordCharSet = passwordCharSet.concat(specialChars);
  }
  
  
  
}

// function to prompt user to choose if they want to include each character type
var getCharacters = function(){
  var lower = window.confirm("You can include lowercase, uppercase, numeric, and/or special characters. You must include at least one character type.\n\n Would you like to include lowercase characters?");
  var upper = window.confirm("You can include lowercase, uppercase, numeric, and/or special characters. You must include at least one character type.\n\n Would you like to include uppercase characters?");
  var numeric = window.confirm("You can include lowercase, uppercase, numeric, and/or special characters. You must include at least one character type.\n\n Would you like to include numeric characters?");
  var special = window.confirm("You can include lowercase, uppercase, numeric, and/or special characters. You must include at least one character type.\n\n Would you like to include special characters?");
  // return array of boolean values for whether the user choose to include each character type
  return [lower, upper, numeric, special];
}

// Add event listener to generate button. Call writePassword on click
generateBtn.addEventListener("click", writePassword);
