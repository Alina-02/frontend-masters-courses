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
let win = false;

document.addEventListener("keydown", (event) => {
  if (attempts < 6 && !win) {
    updateActualWord(event.key);
    rerender();
  }
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
  const waitDiv = document.querySelector(".wait-div");
  waitDiv.innerHTML = "Waiting for a response...";

  isValidWord(JSON.stringify({ word: actual_word }))
    .then((valid) => {
      if (valid) {
        daily_word.then((dw) => {
          console.log(dw);
          const all_correct = checkAllLettersCorrect(dw);
          if (!all_correct) {
            for (i = 0; i < 5; i++) {
              console.log(dw, actual_word);
              if (dw[i] === actual_word[i]) {
                updateLetterColor(
                  document.getElementById(`letter-${attempts}${i + 1}`),
                  "Correct"
                );
              } else if (dw.includes(actual_word[i])) {
                updateLetterColor(
                  document.getElementById(`letter-${attempts}${i + 1}`),
                  "Semicorrect"
                );
              } else {
                updateLetterColor(
                  document.getElementById(`letter-${attempts}${i + 1}`),
                  "Incorrect"
                );
              }
            }
            actual_word = "";
            attempts += 1;
          }
        });
      } else {
        for (i = 0; i < 5; i++) {
          document
            .getElementById(`letter-${attempts}${i + 1}`)
            .classList.add("word-error-animation");
          setTimeout(() => {
            document
              .getElementById(`letter-${attempts}${i + 1}`)
              .removeClass("word-error-animation");
          }, 2000);
        }
      }
    })
    .finally(() => {
      waitDiv.innerHTML = "";
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
    HTMLElement.style.backgroundColor = "#D4AF37";
    HTMLElement.style.color = "white";
  } else if (state === "Incorrect") {
    HTMLElement.style.backgroundColor = "gray";
    HTMLElement.style.color = "white";
  }
};

const checkAllLettersCorrect = (daily_word) => {
  let all_correct = true;
  for (i = 0; i < 5; i++) {
    if (daily_word[i] !== actual_word[i]) {
      all_correct = false;
    }
  }
  if (all_correct) {
    for (i = 0; i < 5; i++) {
      updateLetterColor(
        document.getElementById(`letter-${attempts}${i + 1}`),
        "Correct"
      );
    }
    win = true;
    window.alert("YOU WIN");
  }
  return all_correct;
};
