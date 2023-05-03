// retrieves the last score stored in local storage. If null, then score is set to 0
const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};


// Initialises the score from previous game
updateScoreElement();


// Stores the computer's random guess (rock, paper or scissors)
let computerGuess = "";


// Generates a random index of the available choices in the array and stores it
function computerChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * choices.length);
  computerGuess = choices[randomIndex];
}


// Resets the score to 0 when "Reset Score" button is pressed
function resetScoreCount() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScoreElement();
  storeConditionOfGame();
}


// Stores the outcome of the game (win, lose, tie)
let result = "";


// Checks if the user's choice matches the computer's choice and picks a winner
function game(userChoice) {
  computerChoice();

  switch (userChoice) {
    case "rock":
      switch (computerGuess) {
        case "rock":
          result = "Tie!";
          score.ties++;
          break;
        
        case "paper": 
          result = "You lose!";
          score.losses++;
          break;

        case "scissors":
          result = "You win!";
          score.wins++;
          break;
      } 
      break;

      case "paper":
        switch (computerGuess) {
          case "rock":
            result = "You win!";
            score.wins++;
            break;

          case "paper":
            result = "Tie!";
            score.ties++;
            break;

          case "scissors":
            result = "You lose!";
            score.losses++;
            break;
        }
        break;

      case "scissors":
        switch(computerGuess) {
          case "rock":
            result = "You lose!";
            score.losses++;
            break;

          case "paper":
            result = "You win!";
            score.wins++;
            break;

          case "scissors":
            result = "Tie!";
            score.ties++;
            break;
        }
        break;
  }
  document.querySelector(".js-result").innerHTML = `${result}`;
  document.querySelector('.js-user-choice-label').innerHTML = `You picked: ${userChoice}`;
  document.querySelector('.js-computer-choice-label').innerHTML = `Computer picked: ${computerGuess}`;
  updateResultColor();
  updateScoreElement();
  storeConditionOfGame();
}


// Updates the score after each button press
function updateScoreElement() {
  document.querySelector('.js-wins').innerHTML = `Wins: ${score.wins}`;
  document.querySelector('.js-losses').innerHTML = `Losses: ${score.losses}`;
  document.querySelector('.js-ties').innerHTML = `Ties: ${score.ties}`;
}


// Stores the results-container class element in the html file
const resultElements = document.getElementsByClassName('js-result-main-container');


// Resets the guess info after "Reset Score" button is pressed
function resetGuesses() {
  document.querySelector(".js-result").innerHTML = '_';
  document.querySelector('.js-user-choice-label').innerHTML = '_';
  document.querySelector('.js-computer-choice-label').innerHTML = '_';

  for (var i = 0; i < resultElements.length; i++) {
    resultElements[i].style.backgroundColor = "gray";
  }
}


// Updates the background color of the result to indicate if it is a win, loss or tie
function updateResultColor() {
  switch (result) {
    case "You win!":
      for (var i = 0; i < resultElements.length; i++) {
        resultElements[i].style.backgroundColor = "gold";
      }
      break;

    case "You lose!":
      for (var i = 0; i < resultElements.length; i++) {
        resultElements[i].style.backgroundColor = "rgb(238, 61, 61)";
      }
      break;

    case "Tie!":
      for (var i = 0; i < resultElements.length; i++) {
        resultElements[i].style.backgroundColor = "rgb(255, 151, 40)";
      }
      break;
  }
}

function storeConditionOfGame() {
  localStorage.setItem("score", JSON.stringify(score));
}