const form = document.querySelector(".js-form"),
  input = form.querySelector(".js-name-input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CL = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CL);
  input.focus();
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CL);
  greeting.classList.add(SHOWING_CL);
  greeting.innerHTML = `Hello ${text} <span class="edit js-edit">✍️</span>`;

  document.querySelector(".js-edit").addEventListener("click", function() {
    greeting.classList.remove(SHOWING_CL);
    form.classList.add(SHOWING_CL);
    input.focus();
  });
  saveName(text);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init() {
  loadName();
  form.addEventListener("submit", handleSubmit);
}

init();