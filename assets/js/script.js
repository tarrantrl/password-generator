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

// function to convert array to string
var arrayToString = function (array){
  var string = "";
  for (i = 0; i < array.length; i++){
    string += array[i];
  }
  return string;
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

// function to prompt user to choose if they want to include each character type
var getCharacters = function(){
  var lower = window.confirm("You can include lowercase, uppercase, numeric, and/or special characters. You must include at least one character type.\n\n Would you like to include lowercase characters?");
  var upper = window.confirm("You can include lowercase, uppercase, numeric, and/or special characters. You must include at least one character type.\n\n Would you like to include uppercase characters?");
  var numeric = window.confirm("You can include lowercase, uppercase, numeric, and/or special characters. You must include at least one character type.\n\n Would you like to include numeric characters?");
  var special = window.confirm("You can include lowercase, uppercase, numeric, and/or special characters. You must include at least one character type.\n\n Would you like to include special characters?");
  // return array of boolean values for whether the user choose to include each character type
  return [lower, upper, numeric, special];
}

// function to check if any value from one array is contained in another
var checkForArrayVals = function (mainArray, refArray){
  for (i = 0; i < refArray.length; i++){
    // check whether the character at index i of refArray is in mainArray. If so, return true
    if (mainArray.includes(refArray[i])){
      return true;
    }
  }
  return false;
}

// function to check whether a specific character type is in the password and to replace a random index of password with a random index of the character type reference list if there is not a character of that type
var checkForCharParameter = function (passArray, charTypeRefArray){
  // check if password generated has any chars from ref array
  var hasCharType = checkForArrayVals(passArray, charTypeRefArray);
  // if it does not have any of those char
  if (!hasCharType){
    // replace random index of passArray with random index of
    passArray[Math.floor(Math.random()*passArray.length)] = charTypeRefArray[Math.floor(Math.random()*charTypeRefArray.length)]
  }
  return passArray;
}

// function to check for all specified character types and replace if not in password
var checkForAllChars = function (passArray, useLower, useUpper, useNumeric, useSpecial){
  // if user included lower chars
  if (useLower){
    // check for lower chars and replace if needed
    passArray = checkForCharParameter (passArray, lowerChars);
  }
  // if user included upper chars
  if (useUpper){
    // check for upper chars and replace if needed
    passArray = checkForCharParameter (passArray, upperChars);
  }
  // if user included numeric chars
  if (useNumeric){
    // check for numeric chars and replace if needed
    passArray = checkForCharParameter (passArray, numericChars);
  }
  // if user included numeric chars
  if (useSpecial){
    // check for special chars and replace if needed
    passArray = checkForCharParameter (passArray, specialChars);
  }
  return passArray;
}

// function to prompt user for password parameters and generate password
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
  
  // generate a password of passwordLength including each of the character types chosen
  var password = [];
  
  // generate password of specified length
  for (i = 0; i < passwordLength; i++){
    // choose a random number from 0 to length of passwordCharSet
    var index = Math.floor(Math.random() * passwordCharSet.length);
    // append character at that index to password
    password.push(passwordCharSet[index]);
    //console.log (index + ", " + password);
  }

  // validate that all character types are included in the password using checkForArrayVals
  // track whether all char types are included. Initially false
  var hasAllCharTypes = false;
  // while not all char types are in the password
  while (!hasAllCharTypes){
    // set hasAllCharTypes to true for &&ing
    hasAllCharTypes = true;
    // if user chose lower hcars
    if (includeLower){
      // check whether password has lower chars
      var hasLower = checkForArrayVals(password, lowerChars);
      // update hasAllCharTypes using and. If hasLower is true, hasAllCharTypes will be true since it is already set to true
      hasAllCharTypes = hasAllCharTypes && hasLower;
    }
    // if user chose upper chars
    if (includeUpper){
      // check whether password has upper chars
      var hasUpper = checkForArrayVals(password, upperChars);
      // update hasAllCharTypes
      hasAllCharTypes = hasAllCharTypes && hasUpper;
    }
    // if user chose numeric chars
    if (includeNumeric){
      // check whether password has numeric chars
      var hasNumeric = checkForArrayVals(password, numericChars);
      // update hasAllCharTypes
      hasAllCharTypes = hasAllCharTypes && hasNumeric;
    }
    // if user chose special chars
    if (includeSpecial){
      // check whether password has special chars
      var hasSpecial = checkForArrayVals(password, specialChars);
      // update hasAllCharTypes
      hasAllCharTypes = hasAllCharTypes && hasSpecial;
    }
    //console.log("password before replace", password);
    // if not all char types were in the password
    if (!hasAllCharTypes){
      // use the function to replace a random index of password with one of the specified char types
      password = checkForAllChars(password, includeLower, includeUpper, includeNumeric, includeSpecial);
    }  
    //console.log("password after replace", password);
  }
  
  // convert password (array) to string
  var strPassword = arrayToString(password);
  return strPassword;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  // generate password
  var password = generatePassword();
  // select element to insert password into
  var passwordText = document.querySelector("#password");
  // insert password into HTML
  passwordText.value = password;
}

// Add event listener to generate button. Call writePassword on click
generateBtn.addEventListener("click", writePassword);
