const WORD_OF_THE_DAY_URL = "https://words.dev-apis.com/word-of-the-day";
const CHECK_WORD_URL = "https://words.dev-apis.com/validate-word";

const getWordOfTheDay = async () => {
  try {
    const promise = await fetch(WORD_OF_THE_DAY_URL);
    const processedResponse = await promise.json();

    const word = processedResponse?.word;
    return word;
  } catch (error) {
    console.log("Error getting the word of the day.");
  }
};

let daily_word = getWordOfTheDay();
let actual_word = "";

let attempts = 1;

document
  .querySelector(".tester-input")
  ?.addEventListener("keydown", (event) => {
    if (isLetter(event.key)) {
      event.preventDefault();
    }
  });

document.addEventListener("keydown", (event) => {
  updateActualWord(event.key);
  rerender();
});

const updateActualWord = (letter) => {
  if (isLetter(letter)) {
    if (actual_word.length < 5) {
      actual_word += letter;
    } else {
      actual_word = actual_word.substring(0, actual_word.length - 1);
      actual_word += letter;
    }
  } else if (letter == "Backspace") {
    actual_word = actual_word.slice(0, -1);
  } else if (letter === "Enter") {
    checkActualWord();
  }
};

const rerender = () => {
  const letterOneDiv = document.getElementById(`letter-${attempts}1`);
  letterOneDiv.innerHTML =
    actual_word.length >= 1 ? actual_word[0].toUpperCase() : "";

  const letterTwoDiv = document.getElementById(`letter-${attempts}2`);
  letterTwoDiv.innerHTML =
    actual_word.length >= 2 ? actual_word[1].toUpperCase() : "";

  const letterThreeDiv = document.getElementById(`letter-${attempts}3`);
  letterThreeDiv.innerHTML =
    actual_word.length >= 3 ? actual_word[2].toUpperCase() : "";

  const letterFourDiv = document.getElementById(`letter-${attempts}4`);
  letterFourDiv.innerHTML =
    actual_word.length >= 4 ? actual_word[3].toUpperCase() : "";

  const letterFiveDiv = document.getElementById(`letter-${attempts}5`);
  letterFiveDiv.innerHTML =
    actual_word.length >= 5 ? actual_word[4].toUpperCase() : "";

  if (attempts > 6) {
    window.alert("FAILED");
  }
};

const checkActualWord = () => {
  isValidWord(JSON.stringify({ word: actual_word })).then((valid) => {
    if (valid) {
      daily_word.then((dw) => {
        console.log("aaa");
        console.log(dw);
        console.log(actual_word);
        if (dw[0] === actual_word[0]) {
          updateLetterColor(
            document.getElementById(`letter-${attempts}1`),
            "Correct"
          );
        } else if (dw[1] === actual_word[1]) {
          updateLetterColor(
            document.getElementById(`letter-${attempts}2`),
            "Correct"
          );
        } else if (dw[2] === actual_word[2]) {
          updateLetterColor(
            document.getElementById(`letter-${attempts}3`),
            "Correct"
          );
        } else if (dw[3] === actual_word[3]) {
          updateLetterColor(
            document.getElementById(`letter-${attempts}4`),
            "Correct"
          );
        } else if (dw[4] === actual_word[4]) {
          updateLetterColor(
            document.getElementById(`letter-${attempts}5`),
            "Correct"
          );
        }
      });
    }
  });
};

const isLetter = (letter) => {
  return /^[a-zA-z]$/.test(letter);
};

const isValidWord = async (word) => {
  try {
    const promise = await fetch(CHECK_WORD_URL, { method: "POST", body: word });
    const processedResponse = await promise.json();

    const validWord = processedResponse?.validWord;
    return validWord;
  } catch (error) {
    console.log("Error getting if the word is valid.");
  }
};

const updateLetterColor = (HTMLElement, state) => {
  if (state === "Correct") {
    HTMLElement.style.backgroundColor = "green";
    HTMLElement.style.color = "white";
  } else if (state === "Semicorrect") {
    HTMLElement.style.backgroundColor = "yellow";
    HTMLElement.style.color = "white";
  } else if (state === "Incorrect") {
    HTMLElement.style.backgroundColor = "gray";
    HTMLElement.style.color = "white";
  }
};
