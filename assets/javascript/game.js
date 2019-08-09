var words = ["MOTORCYCLE",
    "PANHEAD",
    "SCOUT",
    "BOBBER",
    "CHIEF",
    "SOFTTAIL",
    "INDIAN",
    "HARLEY",
    "CHOPPER"];
var guessedLetters = "";
var currentWord;
var guessCounter = 12;
var winCounter = 0;
var letter;
var solution = "";
var solutionText = "";
var solutionArray = [];
var letterMatched = false;
var wordLength = 0;

var winCountText = document.getElementById("winCount");
var solutionWordText = document.getElementById("solutionWord");
var guessesLeftText = document.getElementById("guessesLeft");
var lettersGuessedText = document.getElementById("lettersGuessed");

// Function to randomly select a word for the game.
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Function to initialize vairables and document element content.
function initGame() {
    // Initialize variables
    solution = "";
    guessCounter = 12;
    guessedLetters = "";

    // Initialize the word to play using the getRandomWord function.
    currentWord = getRandomWord();
    wordLength = currentWord.length;

    // Log the answer to the console for deugging
    console.log(currentWord);

    // Initialize the placeholders for the word's letters with
    // underscore characters.
    for (var i = 0; i < wordLength; i++) {
        solutionArray[i] = "_ ";
    }

    buildSolution();

    // Initialize the content of the elements that are updated
    // as the game is played.
    winCountText.textContent = winCounter;
    guessesLeftText.textContent = guessCounter;
    lettersGuessedText.textContent = guessedLetters;
}

function buildSolution() {
    solution = "";
    solutionText = "";

    for (var i = 0; i < wordLength; i++) {
        solution = solution + solutionArray[i];
        console.log(solution);
        solutionText = solutionText + solutionArray[i] + "  ";
    }

    solutionWordText.textContent = solutionText;
}

// Run the initGame fucntion to initialize variables and document
// elements.
initGame();

// This function is run whenever the user presses a key.
document.onkeyup = function (event) {
    // Get letter pressed
    letter = event.key.toUpperCase();

    // Update Guessed Letters temp variable and update element
    // content to display the letters guessed so far.
    guessedLetters = guessedLetters + letter + "  ";
    lettersGuessedText.textContent = guessedLetters;

    // If the letter doesn't match any in the word, decrement
    // the guessCounter variables and update the element content
    // to display the number of guesses remaining.
    if (currentWord.includes(letter)) {
        for (var i = 0; i < wordLength; i++) {
            if (currentWord.charAt(i) === letter) {
                solutionArray[i] = letter;
            }
        }

        buildSolution();
    }
    else {
        guessCounter--;
        guessesLeftText.textContent = guessCounter;
    }

    if (solution === currentWord) {
        winCounter++;
        winCountText.textContent = winCounter;
        initGame();
    }

    // If guessCounter drops to zero, game over.
    if (parseInt(guessCounter) === 0) {
        initGame();
    }
}