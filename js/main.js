import words from "./word.js";
// elements
const inputEl = document.querySelector(".input");
const titleEl = document.querySelector(".title");
const scoreEl = document.querySelector(".score");
const timeEl = document.querySelectorAll(".time span ");
const overlayEl = document.querySelector(".overlay");
const selectEl = document.querySelector("select");
const modalScore = document.querySelector(".modal-score");
const modalBtn = document.querySelector(".modal-btn");
const recordScore = document.querySelector(".modal-record");

// count
let count = 10;

// start time
let time = 10;

// user score
let score = 0;

// select
selectEl.addEventListener("change", () => {
  if (selectEl.value === "qiyin") {
    count = 5;
  } else if (selectEl.value === "oson") {
    count = 10;
  } else if (selectEl.value === "murakkab") {
    count = 3;
  }
});

// creat random number
let randomNumber = Math.floor(Math.random() * words.length);

// show random word
titleEl.textContent = words[randomNumber];

// check input value
inputEl.addEventListener("input", () => {
  if (inputEl.value === words[randomNumber]) {
    randomNumber = Math.floor(Math.random() * words.length);
    titleEl.textContent = words[randomNumber];
    inputEl.classList.remove("error");
    inputEl.setAttribute("placeholder", "So'z yozing...");
    score++;
    scoreEl.textContent = score;
    inputEl.value = "";
    time += count;
  } else if (words[randomNumber].length === inputEl.value.length) {
    inputEl.classList.add("error");
    inputEl.setAttribute("placeholder", "Xato so'z...");
    inputEl.value = "";
  }
});

// decrement time
const decrement = () => {
  const timeInterval = setInterval(() => {
    time--;
    if (time > 59) {
      timeEl[0].textContent = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      timeEl[1].textContent = (time % 60).toString().padStart(2, "0");
    } else {
      timeEl[0].textContent = "00";
      timeEl[1].textContent = time.toString().padStart(2, "0");
    }

    if (time === 0) {
      overlayEl.style.display = "flex";
      modalScore.textContent = score;
      if (score > localStorage.getItem("record")) {
        localStorage.setItem("record", score);
      }
      recordScore.textContent = localStorage.getItem("record") || 0;
      clearInterval(timeInterval);
    }
  }, 1000);
};

decrement();

modalBtn.addEventListener("click", () => {
  time = 10;
  score = 0;
  scoreEl.textContent = 0;
  timeEl[1].textContent = time.toString().padStart(2, "0");
  randomNumber = Math.floor(Math.random() * words.length);
  titleEl.textContent = words[randomNumber];
  decrement();
  overlayEl.style.display = "none";
  inputEl.value = "";
});
