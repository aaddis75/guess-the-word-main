const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const progressParagraph = document.querySelector(".word-in-progress");
const remainingParagraph = document.querySelector(".remaining");
const insideGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again");
const word = "magnolia";

const guessedLetters = [];

const addPlaceholders = function (word) {
  const placeholders = [];
  for (const letter of word) {
    console.log(letter);
    placeholders.push("●");
  }

  progressParagraph.innerText = placeholders.join("");
};

addPlaceholders(word);

guessButton.addEventListener("click", function (e) {
  e.preventDefault();

  message.innerText = "";

  const guessedLetter = letterInput.value;
  console.log(guessedLetter);

  const validatedLetter = validateInput(guessedLetter);
  if(validatedLetter) {
    makeGuess(validatedLetter);
  }

  console.log(validatedLetter);

  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;

  if (input === "") {
    console.log("Please enter a letter.");
  } else if (input.length > 1) {
    console.log("Please enter only one letter.");
  } else if (!input.match(acceptedLetter)) {
    console.log("Please enter a letter.");
  } else {
    return input;
  }
};

const makeGuess = function (letter) {
  const uppercase = letter.toUpperCase();
  if (guessedLetters.includes(uppercase)) {
    console.log("You already guessed that letter. Guess again!");
    console.log(guessedLetters);
  } else {
    guessedLetters.push(uppercase);
  }

  console.log(guessedLetters);
};
