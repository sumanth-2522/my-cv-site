const randomNumber = Math.floor(Math.random() * 100 + 1);
const textArea = document.getElementById("outputTxt");
const startBtn = document.getElementById("start-btn");
const guess = document.getElementById("number");

const form = document.getElementById('form');

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", restart);

console.log(randomNumber);
let numberOfGuesses = 0;


form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    event.preventDefault();
}


function guessTheNumber() {

    let input = parseInt(guess.value);

    if (input > 0 && input <= 100) {
        numberOfGuesses++;

        if (input === randomNumber) {
            console.log("Guessed correctly");
            textArea.setAttribute("class", "green");
            textArea.innerText = `Guessed correctly \n\n Number of guesses ${numberOfGuesses}`;
            startBtn.disabled = true;
            startBtn.setAttribute("class", "gray");
        } else if (randomNumber > input) {
            if ((randomNumber - input) < 10) {
                console.log("Guess is too hot");
                textArea.setAttribute("class", "red");
                textArea.innerText = `Guess is too hot \n\n Number of guesses ${numberOfGuesses}`;
                // textArea.innerText = `Number of guesses ${numberOfGuesses}`;
            } else if ((randomNumber - input) < 30) {
                console.log("Guess is within 30");
                textArea.setAttribute("class", "white");
                textArea.innerText = `Guess is within 30 \n\n Number of guesses ${numberOfGuesses}`;
            } else {
                console.log("Guess is too cold");
                textArea.setAttribute("class", "blue");
                textArea.innerText = `Guess is too cold \n\n Number of guesses ${numberOfGuesses}`;
            }

        } else {
            if ((input - randomNumber) < 10) {
                console.log("Guess is too hot");
                textArea.setAttribute("class", "red");
                textArea.innerText = `Guess is too hot \n\n Number of guesses ${numberOfGuesses}`;
            } else if ((input - randomNumber) < 30) {
                console.log("Guess is within 30");
                textArea.setAttribute("class", "white");
                textArea.innerText = `Guess is within 30 \n\n Number of guesses ${numberOfGuesses}`;
            } else {
                console.log("Guess is too cold");
                textArea.setAttribute("class", "blue");
                textArea.innerText = `Guess is too cold \n\n Number of guesses ${numberOfGuesses}`;

            }

        }

        console.log(input);
        console.log(`Number of guesses are: ${numberOfGuesses}`);
    }
    else {
        textArea.removeAttribute("class");
        textArea.innerText = "Entered number must be within the range of 1-100 only";
    }
}

function restart() {
    numberOfGuesses = 0;
    textArea.innerText = "";
    textArea.setAttribute("class", "");
    guess.innerText = "";
    guess.focus();
    window.location.reload();
    startBtn.disabled = false;
}

// restart();