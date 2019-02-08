var words = [{
  word: "Tags",
  image: "assets/tags.png"
}, {
  word: "javascript",
  image: "assets/tags.png"
}, {
  word: "node",
  image: "assets/node.png"
}, {
  word: "mongo",
  image: "assets/mongo.png"
}, {
  word: "css",
  image: "assets/css.png"
}, {
  word: "html",
  image: "assets/html.png"
}]


var wins, losses, chances, computerGuess, userGuess, defaultImage;
var myoptions = [];
var screenArray = [];


function computerChoice() {
  myword = words[Math.floor(Math.random() * (words.length - 1))].word;
  console.log(myword);
  return myword.toLowerCase();
}

function showImage() {

}

function resetScreen() {
  screenArray = [];
  computerGuess = computerChoice();
  console.log('Computer Chose==>', computerGuess);
  for (let j = 0; j < computerGuess.length; j++) {
    screenArray.push('_');
  }
}

function setup() {
  wins = 0;
  losses = 0;
}

function varSetup() {
  myoptions = [];
  userGuess = '';
  chances = 10;
  defaultImage = "assets/question.gif"
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
    var myarray = Array.from(computerGuess);
    if (JSON.stringify(screenArray) === JSON.stringify(myarray)) {
      wins++;



      const result = words.find(fruit => fruit.word === computerGuess);

      // console.log(words);
      // const result = inventory.find( fruit => fruit.name === 'cherries' );
      // let myImage = words.find(image => {
      //   console.log( image.name,computerGuess)
      //   image.name === computerGuess});
      // console.log(myImage);

      console.log(result);
      document.getElementById("imageHTML").setAttribute("src", result.image);
      // alert('Awesome! You Got Me!')
      setDelay();
      varSetup();
      resetScreen();
    }
  }
}

function displayScreen() {
  var myscreenArray = screenArray.join(' ');
  directionsText.textContent = myscreenArray;
  winsText.textContent = wins;
  lossesText.textContent = losses;
  chanceText.textContent = chances;
  myoptionsText.textContent = myoptions;
  newImage.setAttribute("src", defaultImage);
}

var directionsText = document.getElementById("directions-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var chanceText = document.getElementById("chance-text");
var myoptionsText = document.getElementById("myoptions-text");
var screenText = document.getElementById("screen-display");
var newImage = document.getElementById("imageHTML");
//Initialise the Game
setup();
varSetup();
resetScreen();

function setDelay() {
  instruction = "Press Any Key to Continue";
  document.getElementById("instructionHTML").innerHTML = instruction;

}

// Create variables that hold references to the places in the HTML where we want to display things.
// Word is madona

// This function is run whenever the user presses a key.

document.onkeyup = function (event) {
  if (event.key.match(/^[A-z]$/g)) {
    // document.write('');
    console.log('Computer Chose==>', computerGuess);
    // Determines which key was pressed.
    userGuess = event.key;

    console.log('User Chose==>', userGuess);
    userGuess = userGuess.toLowerCase();

    if (myoptions.indexOf(userGuess) === -1) {
      myoptions.push(userGuess);
      chances -= 1;
    }


    validateUserGuess();

    if (chances <= 0) {
      losses++;
      varSetup();
      resetScreen();
    }
    // // Hide the directions
    displayScreen();

  } else {
    alert('Enter From a-z');
  }
}