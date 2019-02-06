var words = ["Tags", "javascript", "node", "mongo", "css", "html"]

function computerChoice() {
  myword = words[Math.floor(Math.random() * (words.length - 1))];
  return myword.toLowerCase();
}

var wins, losses, chances, computerGuess, userGuess;
var myoptions = [];
var screenArray = [];


function resetScreen() {
  screenArray = [];
  computerGuess = computerChoice();
  console.log('Computer Chose==>', computerGuess);
  for (let j = 0; j < computerGuess.length; j++) {
    screenArray.push('_');
  }
  console.log("User Guess Array=>", screenArray);
}

function setup() {
  wins = 0;
  losses = 0;
}

function varSetup() {
  myoptions = [];
  userGuess = '';
  // computerGuess = '';
  chances = 8;
}

function validateDuplicates() {
  // alert("before", myoptions)
  // alert(myoptions);
  if (myoptions.includes(userGuess)) {
    return true;
  }
}

function validateUserGuess() {

  if (computerGuess.includes(userGuess)) {
    var indices = [];
    for (var i = 0; i < computerGuess.length; i++) {
      if (computerGuess[i] === userGuess) {
        indices.push(i);
      }
    }
    for (k = 0; k < indices.length; k++) {
      screenArray[indices[k]] = userGuess;
    }
    // // This logic determines the outcome of the game (win/loss/tie), and increments the appropriate number
    var myarray = Array.from(computerGuess);
    // console.log("converted array", JSON.stringify(myarray));

    if (JSON.stringify(screenArray) === JSON.stringify(myarray)) {
      wins++;
      varSetup();
      resetScreen();
      alert('Awesome! You Got Me!')
    }

  } else {
    chances -= 1;
  }
}

function displayScreen() {
  directionsText.textContent = screenArray;
  winsText.textContent = wins;
  lossesText.textContent = losses;
  chanceText.textContent = chances;
  myoptionsText.textContent = myoptions;
}

// function displayScreen() {
//   directionsText.textContent = screenArray;
//   winsText.textContent = "wins: " + wins;
//   lossesText.textContent = "losses: " + losses;
//   chanceText.textContent = "Guess Left: " + chances;
//   myoptionsText.textContent = " Your Guesses So far: " + myoptions;
// }


var directionsText = document.getElementById("directions-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var chanceText = document.getElementById("chance-text");
var myoptionsText = document.getElementById("myoptions-text");
var screenText = document.getElementById("screen-display");

//Initialise the Game
setup();
varSetup();
resetScreen();


// Create variables that hold references to the places in the HTML where we want to display things.
// Word is madona

// This function is run whenever the user presses a key.

document.onkeyup = function (event) {
  if (event.key.match(/^[!@#$%^&*(),.?":{}|/<> 0-9]$/g)) {
    alert('Enter From a-z');
  } else {
    // document.write('');
    console.log('Computer Chose==>', computerGuess);
    // Determines which key was pressed.
    userGuess = event.key;
  }

  console.log('User Chose==>', userGuess);
  userGuess = userGuess.toLowerCase();
  console.log("Dup check",validateDuplicates());
  console.log("myoptions",myoptions);
 
 
  if (validateDuplicates()===true && myoptions.length<2) {
    myoptions.push(userGuess);
  }
  // new Array(computerGuess.length);

  validateUserGuess();

  if (chances <= 0) {
    losses++;
    varSetup();
    resetScreen();
  }
  // // Hide the directions
  displayScreen();
}