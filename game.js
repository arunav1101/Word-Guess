var words = [{
  word: "mern",
  image: "assets/images/mern.jpeg"
}, {
  word: "javascript",
  image: "assets/images/js.png"
}, {
  word: "node",
  image: "assets/images/node.png"
}, {
  word: "mongodb",
  image: "assets/images/mongo.png"
}, {
  word: "css",
  image: "assets/images/css.png"
}, {
  word: "html",
  image: "assets/images/html.png"
}]


var wins, losses, chances, computerGuess, userGuess, defaultImage = "assets/images/question.gif";
var myoptions = screenArray= [];
var directionsText = document.getElementById("directions-text");
var winsText = document.getElementById("wins-text");
var lossesText = document.getElementById("losses-text");
var chanceText = document.getElementById("chance-text");
var myoptionsText = document.getElementById("myoptions-text");
var screenText = document.getElementById("screen-display");
var newImage = document.getElementById("imageHTML");
var instruction = "Press Any Key to Continue";

function computerChoice() {
  myword = words[Math.floor(Math.random() * (words.length))].word;
  console.log(myword);
  return myword.toLowerCase();
}

function resetScreen() {
  screenArray = [];
  computerGuess = computerChoice();
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
}

function gameInstruction() {
  document.getElementById("instructionHTML").innerHTML = instruction;
  newGame();
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
      return true;
    }
  }
}

function winner() {
  const result = words.find(e => e.word === computerGuess);
  console.log(result.image);
  newImage.setAttribute("src", result.image);
  return result.image;
}

function restartGame() {
  // document.onkeydown = function (event1) {
  varSetup();
  resetScreen();
  displayScreen();
  document.getElementById("instructionHTML").innerHTML = instruction;
}

async function hideImage() {
  //  5000 = 5 seconds
  await setTimeout(function () {
    document.getElementById("mycontainer").setAttribute("src", "");
  }, 3000);
}

function startMyGame() {
  document.getElementById("instructionHTML").innerHTML = "";
  document.onkeyup = function (event) {

    if (event.key.match(/^[A-z]$/g)) {

      console.log('Computer Chose==>', computerGuess);
      userGuess = event.key;

      console.log('User Chose==>', userGuess);
      userGuess = userGuess.toLowerCase();

      if (myoptions.indexOf(userGuess) === -1) {
        myoptions.push(userGuess);
        chances -= 1;
      }
      let checkResults = validateUserGuess();
      if (checkResults) {
        let GuessWordImage = winner();
        document.getElementById("mycontainer").setAttribute("src", GuessWordImage);
        hideImage();
        restartGame();
      };

      if (chances <= 0) {
        losses++;
        varSetup();
        resetScreen();

      }
      displayScreen();
      startMyGame();

    } else {
      alert('Enter From a-z');
    }
  }
}
setup();
gameInstruction();

function newGame() {
  document.onkeyup = function (event) {
    varSetup();
    resetScreen();
    displayScreen();
    startMyGame();
  }
}
