const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greeting"),
  love = document.querySelector(".love");

const userStorage = "currentUser",
  show = "showing",
  blocking = "blocking";

function saveName(text){
  localStorage.setItem(userStorage, text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askName(){
  form.classList.add(show);
  love.id = blocking;
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text){
  form.classList.remove(show);
  greeting.classList.add(show);
  love.id = "";
  greeting.innerText = `Good to see you, ${text}!`; 
}

function loadName(){
  const currentUser = localStorage.getItem(userStorage);
  if(currentUser === null){
    askName();
  } else{
    paintGreeting(currentUser);
  }
}

function init(){
  loadName();
}

init();