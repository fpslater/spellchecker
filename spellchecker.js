// language code for dictionary
var languageCode = 'en_US';

// dependencies
var Typo = require('typo-js');
var dictionary = new Typo(languageCode);

// user word input
var argument = process.argv[2];

// returns true if string has any uppercase letters
function hasUpperCase(str) {
    if(str.toLowerCase() != str) {
        return true;
    }
    return false;
}

// returns true if str has more than 3 repeated chars
function hasRepeatedChars(str) {
  var str = str.toLowerCase();
  return /(.)\1\1/.test(str);
}

/**
  returns string with 3 or more repeated charactors reduced to 2
  ie. "dooog" --> "dog", or "sweeeeet" ---> "swet"
  Not ideal, but it saved going to the dictionary for suggestions in some cases.
**/
function trimRepeatedChars(str) {
  var str = str.toLowerCase(),
      max = 2;
      newStr = '',
      count = 0,
      char = '';

  for (var i = 0; i < str.length; i++) {
    str.charAt(i) === char ? count++ : count = 0;
    if (count < max) {
      newStr += str.charAt(i);
    }
    char = str.charAt(i);
  }

  return newStr;
}

/*
  prints out suggested word, if initially incorrect case or has been trimmed of repeated chartors
  if not, prints that the original word as being spelled correctly
  Basically, this function represents a word that didn't need a dictionary suggestion
*/
function handleCorrectSpelling (str, hasRepeatedCharactors) {
  if (hasUpperCase(str.substr(1)) || hasRepeatedCharactors) {
    console.log(str.toLowerCase());
  } else {
    console.log(str + ' is spelled correctly!');
  }
}

// prints out word dictionary suggestions for word, if available
function handleIncorrectSpelling(str) {
  var suggestions = dictionary.suggest(str);
  if (!suggestions.length) {
    console.log('NO SUGGESTION')
  } else {
    console.log(suggestions.join(', '));
  }
}

/*
  checkSpelling closure for user input str
  checks for repeats and then determines of the word needs suggestions, or not
*/
function checkSpelling(str) {
  var hasRepeats = hasRepeatedChars(str);
  if (hasRepeats) {
    str = trimRepeatedChars(str);
  }

  dictionary.check(str) ? handleCorrectSpelling(str, hasRepeats) : handleIncorrectSpelling(str)
}

// init function. drives the application, if the user passes in a word
function init() {
  if (argument) {
    checkSpelling(argument);
  } else {
    console.log('Please pass in an word to check spelling.')
  }
}

init();

exports.hasUpperCase = hasUpperCase
exports.hasRepeatedChars = hasRepeatedChars
exports.trimRepeatedChars = trimRepeatedChars