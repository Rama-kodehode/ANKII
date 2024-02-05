let userArray = [];

let storedUserArray = localStorage.getItem("userArray");
userArray = storedUserArray ? JSON.parse(storedUserArray) : [];

function getUserInput() {
  let kanjiInput = document.querySelector("#kanji-input");
  let romanjiInput = document.querySelector("#romanji-input");

  let kanjiValue = kanjiInput.value.trim();
  let romanjiValue = romanjiInput.value.trim();

  let userInputObject = {
    kanji: kanjiValue,
    romanji: romanjiValue,
  };

  userArray.push(userInputObject);
  appendToWordsList(userInputObject);

  updateLocalStorage();

  kanjiInput.value = "";
  romanjiInput.value = "";

  console.log(userArray);
}

function appendToWordsList(obj) {
  const wordsList = document.querySelector(".words-li");
  const listItem = document.createElement("li");

  listItem.textContent = `Kanji: ${obj.kanji} Romanji: ${obj.romanji}`;

  wordsList.append(listItem);
}

function playBtn() {
  const cardsContainer = document.querySelector(".cards-container");
  const displayContainer = document.querySelector(".display-container");

  displayContainer.classList.add("hidden");

  //adding cards
  userArray.forEach((item) => {
    const kanjiValue = item.kanji;
    const cards = document.createElement("div");
    cards.classList.add("cards");
    cards.textContent = kanjiValue;

    cardsContainer.append(cards);
  });
}

function checkRomanji() {
  const romanjiToCheck = document
    .querySelector("#play-romanji-input")
    .value.trim();

  const isRomanjiIncluded = userArray.some((item) =>
    item.romanji.includes(romanjiToCheck)
  );

  const cardsContainer = document.querySelector(".cards-container");
  const cards = cardsContainer.querySelectorAll(".cards");

  if (isRomanjiIncluded) {
    cards.forEach((card) => {
      const cardRomanji = card.getAttribute("data-romanji");
      if (cardRomanji && cardRomanji.includes(romanjiToCheck)) {
        card.classList.add("invisible");
      }
    });

    console.log(`There is: ${romanjiToCheck}`);
  } else {
    console.log(`There is not: ${romanjiToCheck}`);
  }
}

function updateLocalStorage() {
  localStorage.setItem("userArray", JSON.stringify(userArray));
}

function clearBtn() {
  localStorage.clear("userArray");
}
