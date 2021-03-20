const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  finishedList = document.querySelector(".js-finished");

const toDosStorage = "toDos";
const finishedStorage = "finished";
let toDos = [];
let finished = [];
let idNumbers = 1;

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function deleteFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinished = finished.filter(function (fnsh) {
    return fnsh.id !== parseInt(li.id);
  });
  finished = cleanFinished;
  saveFinished();
}

function saveToDos() {
  localStorage.setItem(toDosStorage, JSON.stringify(toDos));
}

function saveFinished() {
  localStorage.setItem(finishedStorage, JSON.stringify(finished));
}

function shiftToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const moveToDos = toDos.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  const currentValue = moveToDos[0].text;
  const currentId = moveToDos[0].id;
  paintFinished(currentValue, currentId);
  toDos = cleanToDos;
  saveToDos();
}

function shiftFinished(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const moveToDos = finished.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });
  const cleanToDos = finished.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  const currentValue = moveToDos[0].text;
  paintToDo(currentValue);
  finished = cleanToDos;
  saveFinished();
}

function paintToDo(currentValue) {
  const li = document.createElement("li");
  const del = document.createElement("button");
  const span = document.createElement("span");
  const shift = document.createElement("button");
  const newId = idNumbers;
  idNumbers += 1;
  del.innerText = "✖";
  del.style.color = "maroon";
  del.addEventListener("click", deleteToDo);
  shift.innerText = "✔";
  shift.style.color = "teal";
  shift.addEventListener("click", shiftToDo);
  span.innerText = currentValue;
  li.appendChild(span);
  li.appendChild(del);
  li.appendChild(shift);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: currentValue,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function paintFinished(text, id) {
  const li = document.createElement("li");
  const del = document.createElement("button");
  const span = document.createElement("span");
  const shift = document.createElement("button");
  del.innerText = "✖";
  del.style.color = "maroon";
  del.addEventListener("click", deleteFinished);
  shift.innerText = "↺";
  shift.style.color = "darkgreen";
  shift.addEventListener("click", shiftFinished);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(del);
  li.appendChild(shift);
  li.id = id;
  finishedList.appendChild(li);
  const toDoObj = {
    text: text,
    id: id
  };
  finished.push(toDoObj);
  saveFinished();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(toDosStorage);
  const loadedFinishedToDos = localStorage.getItem(finishedStorage);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedFinishedToDos !== null) {
    const parsedFinished = JSON.parse(loadedFinishedToDos);
    parsedFinished.forEach(function (toDo) {
      paintFinished(toDo.text, toDo.id);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();