const guessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const text = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemaingingGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join(""); 
};
   
placeholder(word);




button.addEventListener("click", function (e) {
    e.preventDefault();
const inputValue = text.value;
//console.log(inputValue);
message.innerText = "";
const goodGuess = playerInput(inputValue);

if (goodGuess) {
    makeGuess(inputValue);
}
text.value="";
});



//function for player's input//


const playerInput = function (input) { 
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === "") {
    message.innerText = "Please enter a letter";
} else if (input.length > 1) {
    message.innerText = "Please enter one letter at a time";
} else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a valid letter";
} else {
    return input;
}
};

//Function to Capture Input//

const makeGuess = function (letter) {
letter = letter.toUpperCase();

    if (guessedLetters.includes(letter)) {
       
        message.innerText = "You have already guessed that letter.Please try another.";
    } else {
        guessedLetters.push(letter);
        console.log(guessedLetters);
    }
}