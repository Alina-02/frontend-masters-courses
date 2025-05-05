let total = 0;
let buffer = "0";

let lastOperator = null;

let result;

const calculatorDiv = document.querySelector(".calculator-div");
const paragraphResult = document.querySelector("p.paragraph-result");

calculatorDiv?.addEventListener("click", (event) => {
  switch (event.target.value) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      onClickNumber(event.target.value);
      break;
    case "/":
    case "x":
    case "-":
    case "+":
      onClickOperator(event.target.value);
      break;
    case "=":
      onClickEqual();
      break;
    case "C":
      onClickC();
      break;
  }

  rerender();
});

const onClickNumber = (textNumber) => {
  if (buffer === "0") {
    buffer = textNumber;
  } else {
    buffer += textNumber;
  }
};

const onClickOperator = (operator) => {
  if (buffer === "0") {
    return;
  }

  const int = parseInt(buffer);
  if (total === 0) {
    total = int;
  } else {
    makeOperation(int);
  }
  console.log(operator);
  lastOperator = operator;

  buffer = "0";
};

const onClickEqual = () => {
  if (lastOperator === null) {
    return;
  }

  makeOperation(parseInt(buffer));
  console.log(total, typeof total, "total");
  console.log(buffer, typeof buffer, "buffer");
  buffer = total;
  total = 0;
  lastOperator = null;
};

const makeOperation = (int) => {
  switch (lastOperator) {
    case "+":
      total += int;
      break;
    case "-":
      total -= int;
      break;
    case "/":
      total /= int;
      break;
    case "x":
      total *= int;
      break;
  }
};

const onClickC = () => {
  total = 0;
  buffer = "0";
  lastOperator = null;
};

function rerender() {
  paragraphResult.textContent = buffer;
}
