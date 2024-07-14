
let everydayPhrases = [];
const startBtn = document.getElementById("start");
const guesses = document.getElementById('mistake');
const word = document.getElementById('word');
const message = document.getElementById('message');
const image = document.getElementById('hangman-img');
const playerName = document.getElementById('name');
const nameBtn = document.getElementById('nameBtn');
const showScores = document.getElementById('scores');
const showGuesses = document.getElementById('guesses');
let randomPhrase = '';
const maxWrong = 6;
let mistakes = 0;
let guessed = [];
let guessedPhrase = '';
let isgameWon = false;
let directory = [];
let enteredName = '';
let wrongGuesses = [];
let hintArray = [];


nameBtn.addEventListener('click', getName);

if ("directory" in localStorage) {
    directory = JSON.parse(localStorage.getItem("directory"));
    showAllScores();
}

function getName() {
    enteredName = playerName.value;
    startBtn.disabled = false;
    nameBtn.disabled = true;
}

function addScore() {
    const score = {
        "name": enteredName,
        "score": mistakes
    }

    directory.push(score);
    localStorage.setItem('directory', JSON.stringify(directory));
    showAllScores();
}

function showAllScores() {
    showScores.value = '';
    for (let i = 0; i < directory.length; i++) {
        showScores.value += directory[i].name + "\t" + directory[i].score + "\n";
    }
}



function keyPressed(event) {
    inputGuess(event.key);
}

function getPhrase() {
    everydayPhrases = fetch("phrases.json").then(function (response) {
        return response.text();

    }).then(function (data) {
        processResponse(data);
    }).catch(function (error) {
        console.log(`Error - ${error}`)
        if (error instanceof TypeError) {
            console.log("Network disconnected. Unable to fetch the item")
        }
    });
}

function processResponse(data) {
    let phrases = JSON.parse(data);
    randomPhrase = phrases.everydayPhrases[Math.floor(Math.random() * phrases.everydayPhrases.length - 1 + 1)];
    console.log(randomPhrase);
    word.innerText = randomPhrase.split('').map(i => i === ' ' ? i.replace(i, '  ') : i.replace(i, ' _ ')).join('');
    hintArray = Array.from(new Set(randomPhrase.split('')));
}

function showHint(){
    for(let i in hintArray){
        if(guessed.includes(hintArray[i])){
            hintArray.splice(i, 1);
        }
    }
    let hint = hintArray[Math.floor(Math.random() * hintArray.length - 1 + 1)];

    if(hint === ' '){
        showHint();
    }
    inputGuess(hint);
    
}

function dashes() {
    let lettersToDashes = randomPhrase
    .split('')
    .map(letter => (letter === ' ') ? ' ' : (guessed.indexOf(letter) >= 0) ? letter : " _ ").join('');
    guessedPhrase = lettersToDashes;
    word.innerText = lettersToDashes;
}

function isNumber(alfabet) {
    return !isNaN(String(alfabet) * 1);
}

function showWrongGuesses() {
    showGuesses.innerHTML = `Wrong guesses are: (${wrongGuesses.map(i => i).join(',')})`;
}

function inputGuess(alfabet) {

    if (!isNumber(alfabet)) {

        if (guessed.indexOf(alfabet) >= 0) {
            message.innerHTML = 'The letter is already entered';
        }

        if (guessed.indexOf(alfabet) === -1) {
            guessed.push(alfabet);
            message.innerHTML = '';
        }

        if (randomPhrase.indexOf(alfabet) >= 0) {
            dashes();

            if (guessedPhrase === randomPhrase) {
                document.getElementById('key').setAttribute('class', 'green');
                document.getElementById('key').innerHTML = 'Congratulations... Game won!!';
                image.src = '/resources/images/7.gif';
                document.removeEventListener('keypress', keyPressed);
                document.removeEventListener('click', showHint);
                startBtn.setAttribute("class", "btn-hangman");
                addScore();
                playerName.value = '';
                nameBtn.disabled = false;
            }
        } else if (randomPhrase.indexOf(alfabet) >= -1) {
            if (!wrongGuesses.includes(alfabet)) {
                mistakes++;
                wrongGuesses.push(alfabet);
            }
            image.src = `/resources/images/${mistakes}.gif`;
            guesses.innerHTML = mistakes;
            
            message.innerHTML = 'Entered letter do not exist in the Phrase';
            showWrongGuesses();


            if (mistakes === 6) {
                word.innerText = randomPhrase;
                document.getElementById('key').setAttribute('class', 'red');
                document.getElementById('key').innerHTML = 'Game over -- You have been hanged';
                image.src = '/resources/images/6.gif';
                startBtn.setAttribute("class", "btn-hangman");
                startBtn.disabled = false;
                document.removeEventListener('keypress', keyPressed);
                document.removeEventListener('click', showHint);
                addScore();
                playerName.value = '';
                nameBtn.disabled = false;
            }
        }
    } else {
        message.innerHTML = 'Entered character is not an alfhabet';
    }
}

function gameWon(isgameWon) {
    if (isgameWon == true) {
        window.location.reload();
    }
}




function startGame() {
    getPhrase();
    startBtn.setAttribute("class", "gray");
    startBtn.disabled = true;
    mistakes = 0;
    guesses.innerHTML = mistakes;
    guessed = [];
    wrongGuesses = [];
    document.addEventListener('keypress', keyPressed);
    image.src = '/resources/images/0.gif';
    guessedPhrase = '';
    document.getElementById('key').innerHTML = '';
    document.getElementById('key').removeAttribute('class');
    message.innerHTML = '';
    image.addEventListener('click', showHint);

}

document.getElementById("maxWrong").innerHTML = maxWrong;




