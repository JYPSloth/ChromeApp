const body = document.querySelector("body");
const imgNumber = 5;
function paintImage(imgNum){
  const image = new Image();
  image.src = `images/${imgNum}.png`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function genRandom(){
  const number = Math.floor(Math.random() * imgNumber);
  return number;
}

function init(){
  const randomNumber = genRandom() + 1;
  paintImage(randomNumber);
}

init();