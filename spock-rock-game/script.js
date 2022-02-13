import {startConfetti, stopConfetti, removeConfetti} from './confetti.js';


const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let playerScroreNumber=0;
let computerScroreNumber=0;
let computerChoice ='';


//reset all selected icons
function resetSlected(){
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
}

//reset score and playerchoice/computerchoice
function resetAll(){
  playerScroreNumber = 0;
  computerScroreNumber = 0;
  playerScoreEl.textContent = playerScroreNumber;
  computerScoreEl.textContent = computerScroreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSlected();
}
window.resetAll = resetAll;

function computerRandomChoice(){
  const computerChoiceNumber = Math.random();
  if(computerChoiceNumber < 0.2){
    computerChoice = 'rock';
  }else if(computerChoiceNumber <= 0.4){
    computerChoice = 'paper';
  }else if(computerChoiceNumber <= 0.6){
    computerChoice = 'scissors';
  }else if(computerChoiceNumber <= 0.8){
    computerChoice = 'lizard';
  }else {
    computerChoice = 'spock';
  }
  displayComputerChoice();
}
//add selected styling and computer choice
function displayComputerChoice(){
  switch(computerChoice){
    case 'rock':
      computerRock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      computerPaper.classList.add('selected');
      computerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      computerScissors.classList.add('selected');
      computerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      computerLizard.classList.add('selected');
      computerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      computerSpock.classList.add('selected');
      computerChoiceEl.textContent = ' --- Spock';
      break;

    default:
      break;
  }
}

function updateScore(playerChoice){
  if(playerChoice == computerChoice){
    resultText.textContent = "It's a tie.";
  }else{
    const choice = choices[playerChoice];
    if(choice.defeats.indexOf(computerChoice) > -1){
      startConfetti();
      resultText.textContent = 'You Won!';
      playerScroreNumber ++;
      playerScoreEl.textContent = playerScroreNumber;
    }else{
      resultText.textContent = 'You Lost!';
      computerScroreNumber ++;
      computerScoreEl.textContent = computerScroreNumber;
    }
  }
}
//call function to process turn
function checkResult(playerChoice){
  resetSlected();
  computerRandomChoice();  
  updateScore(playerChoice);
}
// passing player selection values and styling icons
function select(playerChoice){
  checkResult(playerChoice);
  //add slected styling and update player choice
  switch(playerChoice){
    case 'rock':
      playerRock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Rock';
      break;
    case 'paper':
      playerPaper.classList.add('selected');
      playerChoiceEl.textContent = ' --- Paper';
      break;
    case 'scissors':
      playerScissors.classList.add('selected');
      playerChoiceEl.textContent = ' --- Scissors';
      break;
    case 'lizard':
      playerLizard.classList.add('selected');
      playerChoiceEl.textContent = ' --- Lizard';
      break;
    case 'spock':
      playerSpock.classList.add('selected');
      playerChoiceEl.textContent = ' --- Spock';
      break;

    default:
      break;
  }
}

window.select = select;
// on start up set initial value
resetAll();



