const clockContainer = document.querySelector(".js-clock")
const clockTitle = clockContainer.querySelector(".js-title");
const clockDate = clockContainer.querySelector(".js-date");
const dateArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
function getTime(){
  const date = new Date();
  const day = date.getDate();
  const options = {month: 'long'};
  const month = new Intl.DateTimeFormat('en-US', options).format(date);
  const year = date.getFullYear();
  const weekday = dateArray[date.getDay()];
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  clockDate.innerText = `${weekday} ${month} ${day}, ${year}`
}

function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();
