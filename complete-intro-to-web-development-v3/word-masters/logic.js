const doggos = document.getElementById("dog-target");

const addNewDoggo = () => {
  const promise = fetch(DOG_URL);

  promise
    .then((response) => {
      //const processingPromise = response.text();
      const processingPromise = response.json();
      return processingPromise;
    })
    .then((processedResponse) => {
      //const dogObject = JSON.parse(processedResponse);
      const img = document.createElement("img");
      img.src = processedResponse.message;
      img.alt = "Cute doggo";
      doggos.appendChild(img);
    })
    .catch((error) => {
      //handle error
    });
};

document.getElementById("dog-btn").addEventListener("click", addNewDoggo);

const asyncAddNewDoggo = async () => {
  const promise = await fetch(DOG_URL);
  const processedResponse = await promise.json();
  const img = document.createElement("img");
  img.src = processedResponse.message;
  img.alt = "Cute doggo";
  doggos.appendChild(img);
};

document.querySelector(".tester-input").addEventListener("keydown", (event) => {
  if (isLetter(event.key)) {
    event.preventDefault();
  }
});

const isLetter = (letter) => {
  return /^[a-zA-z]$/.test(letter);
};
