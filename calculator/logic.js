let mySquare = document.querySelector(".red-square");
mySquare.style.width = "300px";

//get class list
mySquare.classList;
//add class
mySquare.classList.add(".classname");

//insert html
mySquare.innerHTML = <em>lololol</em>;

//Listeners

const button = document.querySelector(".event-button");
button.addEventListener("click", () => {
  alert("hey there");
});

const input = document.querySelector(".input-to-copy");
const paragraph = document.querySelector(".p-to-copy-to");

input.addEventListener("keydown", () => {
  paragraph.ineerText = input.value;
});

//change event (focus and unfocus)
input.addEventListener("change", () => {
  paragraph.style.backgroundColor = input.value;
});

Number.parseInt("5");
