let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
userInput.focus();

let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
    if (isNaN(guess)){
    lowOrHi.textContent = `PLease enter a valid number`
    lowOrHi.style.color = 'red'
    }
    else if (guess < 1){
        lowOrHi.textContent = `PLease enter a More then 1 number`
        lowOrHi.style.color = 'red'
    }
    else if (guess > 100){
    lowOrHi.textContent = `PLease enter a less then 100 number`
    lowOrHi.style.color = 'red'
    }
    else {
        prevGuess.push(guess);
        if (numGuess === 10){
            displayGuess(guess)
            displayMessage(`Game Over. Your 10 Attempts are Over <br> <span>Random number was ${randomNumber}</span>`)
            endGame()
        }
        else {
            displayGuess(guess)
            checkGuess(guess)
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You Win The Game!`)
        lowOrHi.style.color = 'green'
        endGame();
    }
    else if (guess > randomNumber) {
        displayMessage(`Your Number is to high`)
    }
    else {
        displayMessage(`Your Number is Too Low`)
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.textContent += `${guess}, `;
    numGuess++;
    remaining.textContent = `${11 - numGuess}`;
    userInput.focus();
}

function displayMessage(message) {
  lowOrHi.innerHTML = `${message}`;
}

function endGame() {
  userInput.setAttribute('disabled', '')
  submit.setAttribute('disabled', '')
  p.classList.add("button");
  p.textContent = 'Start New Game'
  startOver.append(p);
  newGame();
}

function newGame() {
    const newGameButton = document.querySelector('.button');
    newGameButton.addEventListener('click', function(e){
        e.preventDefault();
        userInput.focus()
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        submit.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    })
}