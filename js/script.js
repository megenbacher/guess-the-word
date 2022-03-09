const guessed = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const text = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const hiddenButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;



const getWord = async function () {
    const res = await fetch( 
        "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
        const words = await res.text();
        const wordArray = words.split("\n");
        const randomIndex = Math.floor(Math.random() * wordArray.length);
        word = wordArray[randomIndex].trim();
        placeholder(word);
    };
 
  getWord();
    

const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join(""); 
};
   





button.addEventListener("click", function (e) {
    e.preventDefault();

//console.log(inputValue);
message.innerText = "";
const inputValue = text.value;
const goodGuess = playerInput(inputValue);

if (goodGuess) {
makeGuess(inputValue);
}
text.value = "";
});



//function for player's input//


const playerInput = function (input) { 
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
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

const makeGuess = function (guess) {
guess = guess.toUpperCase();

    if (guessedLetters.includes(guess)) {
       
        message.innerText = "You have already guessed that letter. Please try another.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessesLeft(guess);
        update();
        correctLetters(guessedLetters);
    }
};

const update = function () {
    guessed.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innertext = letter;
        guessed.append(li);
    }

};

const correctLetters = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
            
    wordInProgress.innerText = revealWord.join("");
    won();
};

const guessesLeft = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
        } else {
        message.innerText = `Good guess! That letter is included!`;
    }
     
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        spanRemainingGuesses.innerText = `${remainingGuesses} guess`;
    } else {
        spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;

    }
};

const won = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
      message.classList.add("win");
      message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        
      startOver();
  }
    
};

 const startOver = function () {
    button.classList.add("hide");
    remaining.classList.add("hide");
    guessed.classList.add("hide");
    hiddenButton.classList.remove("hide");
    
};

hiddenButton.addEventListener("click", function () {
message.classList.remove("win");
guessedLetters = [];
remainingGuesses = 8;
spanRemainingGuesses.innerText = `${remainingGuesses} guesses`;
guessed.innerHTML = "";
message.innerText = "";

getWord();

button.classList.remove("hide");
hiddenButton.classList.add("hide");
remaining.classList.remove("hide");
guessed.classList.remove("hide");

});

