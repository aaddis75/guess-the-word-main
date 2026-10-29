const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const progressParagraph = document.querySelector(".word-in-progress");
const remainingParagraph = document.querySelector(".remaining");
const insideGuesses = document.querySelector("span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again");


let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt",
  );

  const words = await response.text();
  const wordArray = words.split("\n");
  console.log(wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);

  const randomWord = wordArray[randomIndex].trim();
  word = randomWord;
  //console.log(word);
  addPlaceholders(word);
};

getWord();

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
  if (validatedLetter) {
    makeGuess(validatedLetter);
  }

  console.log(validatedLetter);

  letterInput.value = "";
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;

  if (input === "") {
    message.innerText = "Please enter a letter.";
  } else if (input.length > 1) {
    message.innerText = "Please enter only one letter.";
  } else if (!input.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

const makeGuess = function (letter) {
  const uppercase = letter.toUpperCase();
  if (guessedLetters.includes(uppercase)) {
    message.innerText = "You already guessed that letter. Guess again!";
    console.log(guessedLetters);
  } else {
    guessedLetters.push(uppercase);
    pageUpdate();
    countGuessesRemaining(uppercase);
    wordInProgress(guessedLetters);
  }

  console.log(guessedLetters);
};

const pageUpdate = function () {
  guessedLettersList.innerHTML = "";

  guessedLetters.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.innerText = item;
    guessedLettersList.appendChild(listItem);
  });
};

const wordInProgress = function (guessedLetters) {
  const updatedWord = [];
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  console.log(wordArray);

  wordArray.forEach(function (letter) {
    if (guessedLetters.includes(letter)) {
      updatedWord.push(letter);
    } else {
      updatedWord.push("●");
    }
  });

  const displayWord = updatedWord.join("");

  progressParagraph.innerText = displayWord;
  checkForWin();
};

const countGuessesRemaining = function (guess) {
  const uppercaseWord = word.toUpperCase();
  if (uppercaseWord.includes(guess)) {
    message.innerText = "That word does contain the letter.";
  } else {
    message.innerText = "That word does not contain the letter.";
    remainingGuesses -= 1;
  }
  if (remainingGuesses === 0) {
    message.innerText = `The game is over. ${word.toUpperCase()}`;
  } else if (remainingGuesses === 1) {
    insideGuesses.innerText = "1 guess remaining";
  } else {
    insideGuesses.innerText = `You have ${remainingGuesses} left.`;
  }
};

const checkForWin = function () {
  if (progressParagraph.innerText === word.toUpperCase()) {
    message.classList.add("win");
    message.innerText = "You guessed the correct word! Congrats!";
  }
};
