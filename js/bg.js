const body = document.querySelector("body"),
  background = body.querySelector(".background-item");

const IMG_NUMBER = 21;

function paintImage(imgNumber) {
  (function(image){
    image.onload = function(event){ 
      background.style.backgroundImage = `url(images/${imgNumber + 1}.jpg)`;
      };
    image.src = `images/${imgNumber + 1}.jpg`;
  })(new Image());
  
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function changeBackground() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

function init() {
  changeBackground();
  setInterval(changeBackground, 10 * 1000);
}

init();