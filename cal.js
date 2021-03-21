const inputNum = document.getElementById("input");
const allClear = document.getElementById("all-clear");
const clearBtn = document.getElementById("clear");
const numbers = Array.from(document.querySelectorAll(".number"));
const dot = document.getElementById("dot");
const sign = document.getElementById("sign");
const operator = Array.from(document.querySelectorAll(".amt"));
const result = document.getElementById("result");

const foldCalBtn = document.querySelector(".js-foldCal"),
  unfoldCalBtn = document.querySelector(".js-unfoldCal"),
  cal = document.querySelector(".calculator");

function foldCal(){
  cal.id = "blocking";
  unfoldCalBtn.id = "";
}

function unfoldCal(){
  cal.id = "";
  unfoldCalBtn.id = "blocking";
}

let currentOp = "",
  currentVal = 0,
  opClicked = false;

function signBtnHandler() {
  sign.addEventListener("click", () => {
    if (inputNum.innerText.startsWith("-")) {
      inputNum.innerText = inputNum.innerText.slice(1);
    } else if(inputNum.innerText = "0"){
      return;
    } else{
      inputNum.innerText = `-${inputNum.innerText}`;
    }
  });
}

function numberBtnHandler() {
  numbers.forEach((number) => {
    number.addEventListener("click", (evt) => {
      let targetDigit = evt.target.innerText;
      if (inputNum.innerText === "0" || opClicked === true) {
        inputNum.innerText = "";
        opClicked = false;
      }
      if (inputNum.innerText.length > 20) {
        inputNum.innerText = "Max digits: 19";
      } else {
        inputNum.innerText += targetDigit;
      }
    });
  });
}

function calculate(operator, val1, val2) {
  if (operator === "+") {
    return val1 + val2;
  } else if (operator === "-") {
    return val1 - val2;
  } else if (operator === "*") {
    return val1 * val2;
  } else if (operator === "/") {
    return val1 / val2;
  }
}

function operatorBtnHandler() {
  operator.forEach((operatorBtn) => {
    operatorBtn.addEventListener("click", (evt) => {
      let inputVal = Number(inputNum.innerText);
      if (currentOp === "") {
        currentVal = Number(inputNum.innerText);
      } else {
        currentVal = calculate(currentOp, currentVal, inputVal);
      }
      inputNum.innerText = currentVal;
      currentOp = evt.target.value;
      opClicked = true;
    });
  });
}

function equalBtnHandler() {
  result.addEventListener("click", () => {
    let inputVal = Number(inputNum.innerText);
    inputNum.innerText = calculate(currentOp, currentVal, inputVal);
    currentOp = "";
    opClicked = true;
    return;
  });
}

function clearBtnHandler() {
  clearBtn.addEventListener("click", () => {
    inputNum.innerText = "0";
  });
}

function allClearBtnHandler() {
  allClear.addEventListener("click", () => {
    currentOp = "";
    currentVal = 0;
    inputNum.innerText = "0";
  });
}

function decimalBtnHandler() {
  dot.addEventListener("click", () => {
    let inputVal = inputNum.innerText;
    if (!inputVal.includes(".")) {
      let addDecimal = inputNum.innerText + ".";
      inputNum.innerText = addDecimal;
    }
  });
}

function init() {
  numberBtnHandler();
  operatorBtnHandler();
  clearBtnHandler();
  allClearBtnHandler();
  decimalBtnHandler();
  signBtnHandler();
  equalBtnHandler();
  if (foldCalBtn){
    foldCalBtn.addEventListener("click",foldCal);
  }
  if(unfoldCalBtn){
    unfoldCalBtn.addEventListener("click",unfoldCal);
  }
}

init();