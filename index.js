

var canvas = document.getElementById("myCanvas");

const  width = 1800;
const height = 500;


const KEYBOARD_CODE = {
  UP : "ArrowUp",
  DOWN : "ArrowDown",
  LEFT : "ArrowLeft",
  RIGHT : "ArrowRight"
}




document.addEventListener("keydown",(e)=>{

  if(e.key === KEYBOARD_CODE.UP)
    carUp()
  else if(e.key === KEYBOARD_CODE.DOWN)
    carDown()
  

})

document.addEventListener("keydown",(e)=>{

  if(e.key == KEYBOARD_CODE.RIGHT)
    CarRun()

  if(e.key == KEYBOARD_CODE.LEFT)
    CarBreak()
})

// document.addEventListener("keyup",(e)=>{

//   if(e.key == KEYBOARD_CODE.RIGHT)
//     carReduzindo()
 
// })


document.getElementById("btn-sobe").addEventListener("click",()=>{
  carUp()
})
document.getElementById("btn-desce").addEventListener("click",()=>{
  carDown()
})

var intervalLoopAcelera = null;
document.getElementById("btn-acelera").addEventListener("mousedown",()=>{

  if(intervalLoopAcelera != null)
    clearInterval(intervalLoopAcelera)

  intervalLoopAcelera = setInterval(()=>{
    CarRun()
  },50)  
  document.getElementById("btn-acelera").addEventListener("mouseup",()=>{
    clearInterval(intervalLoopAcelera)
    console.log("MOUSE OUT")
  })
  carReduzindo()  

})



document.getElementById("btn-freia").addEventListener("drag",()=>{
  CarBreak()

})



var intervalCarBreak = [];

function carUp(){

  if(positionCar.y > 0)
    positionCar.y -= 100

}
function carDown(){

  if(positionCar.y < canvas.height - 100)
    positionCar.y += 100

}
function CarRun(){

  if(positionCar.x < (canvas.width * 0.7))
    positionCar.x += 10 
}
function carReduzindo(){

  clearIntervalAll(intervalCarBreak)
  let interval = setInterval((positionCar, canvas, intervalCarBreak)=>{
    if(positionCar.x > 0)
        positionCar.x -= 2

    else
      clearIntervalAll(intervalCarBreak)

  },50,positionCar, canvas, intervalCarBreak)
  intervalCarBreak.push(interval)

}

function clearIntervalAll(aarrayInterval){
  aarrayInterval.forEach(element =>{
    clearInterval(element)
  })
}

function CarBreak(){
  
  if(positionCar.x > 0)
    positionCar.x -= 10

}


var positionCar = { x : 0, y : 100 }
var positionCar2 = { x : canvas.width + 90, y : 100 }
var positionCar3 = { x : canvas.width + 50, y : 400 }
var positionCar4 = { x : canvas.width + 200, y : 200 }
var positionCar5 = { x : canvas.width + 250, y : 300 }
var positionCar6 = { x : canvas.width + 500, y : 0 }



var cars = [
  { x : canvas.width + 50, y : 100 },
  { x : canvas.width + 150, y : 200 },
  { x : canvas.width + 350, y : 300 },
  { x : canvas.width + 200, y : 400 },
  { x : canvas.width + 900, y : 500 },
  { x : canvas.width , y : 0 }
]


var canvasContext = canvas.getContext("2d");

var corridaCar = new Image();
corridaCar.src = "./fiat.png"
// var corridaCar = new Image();
// corridaCar.src = "./criado.png"



function aleatorio(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


cars.forEach(carPosition =>{

  let velocidade = [ aleatorio(2,20) ]

  setInterval((carPosition,velocidade)=>{


    if(carPosition.x > 0)
      carPosition.x -= velocidade[0]
    else{
      carPosition.x = canvas.width + aleatorio(50,1000)
      velocidade[0]  = aleatorio(2,20)
    }

  },30,carPosition, velocidade)
})


var mainLoop = null

mainLoop = setInterval((canvasContext, canvas )=>{

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);

  canvasContext.drawImage(corridaCar, positionCar.x, positionCar.y);


  cars.forEach(car =>{
    canvasContext.drawImage(corridaCar, car.x, car.y);

    if(car.y == positionCar.y)
      if(car.x + 100 >  positionCar.x && car.x - 110 <  positionCar.x){
        clearInterval(mainLoop)
      }

  })

  canvasContext.moveTo(0,100);
  canvasContext.lineTo(width, 100);

  canvasContext.moveTo(10,50);
  canvasContext.lineTo(55, 50);

  canvasContext.moveTo(0,200);
  canvasContext.lineTo(width, 200);

  canvasContext.moveTo(0,300);
  canvasContext.lineTo(width, 300);
  canvasContext.moveTo(0,400);
  canvasContext.lineTo(width, 400);

  canvasContext.stroke();


},20,canvasContext,canvas, positionCar)

var gameIstarted = false;
document.getElementById("start").addEventListener("click",()=>{
  if(gameIstarted == false)
    gameStart()

  document.getElementById("start").disabled = !gameIstarted
  
  gameIstarted = true;  

})


