const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const progressParagraph = document.querySelector(".word-in-progress");
const remainingParagraph = document.querySelector(".remaining");
const insideGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again");
const word = "magnolia";

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

  const guessedLetter = letterInput.value;
  console.log(guessedLetter);
  letterInput.value = "";
});
