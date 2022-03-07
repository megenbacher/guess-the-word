const guessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const text = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemaingingGuesses = document.querySelector("span");
const messages = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

const word = "magnolia";

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
console.log(inputValue);
text.value = "";
});