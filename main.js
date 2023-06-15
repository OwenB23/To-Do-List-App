"use strict";

// Display Date and Time Function
function displayDateTime() {
  const now = new Date();

  // Date Components
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Time Components
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "America/New_York",
  };
  const timeString = now.toLocaleString("en-US", options);

  // Display the date and time in the HTML with id 'currentTime'
  const dateElement = document.querySelector("#currentTime .date");
  dateElement.textContent = `${month}-${day}, ${year}`;

  const timeElement = document.querySelector("#currentTime .time");
  timeElement.textContent = timeString;
}

setInterval(displayDateTime, 1000);

// Variables to select elements to use in the function
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add-button");

// Function that checks to see if there is a value in the input. If so creates a LI element and an x beside it.
function addTask(event) {
  if (event.key === "Enter" || event.type === "click") {
    if (inputBox.value === "") {
      alert("You must write something!");
    } else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      listContainer.appendChild(li);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
  }
}

inputBox.addEventListener("keyup", addTask);
addButton.addEventListener("click", addTask);

// Funciton that listens for a click on the LI, and calls the checked CSS class. If a SPAN is clicked the item will be removed fromthe list.
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// Function that saves the todo list items when browser is refreshed
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
