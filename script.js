//author Rafi Ersozlu github.com/rafipera

const btn = document.getElementById("btn")
const grid = document.querySelector(".grid")
let score = document.getElementById("score")
const highScore = document.getElementById("high-score")
const hardBtn = document.getElementById("hard-btn")
const helpBtn = document.getElementById("help")
const modal = document.querySelector(".modal")
let ammoDirection = 0
let helpBtnReady = true
let ammoReady = true
let movementReady = true
const size = 400
let squares = []
let snake = [2,1,0]
let direction = 1
let width = 20
let timerId = 0
let speed = 400
let apple = 0
let scoreDisp = 0
let ammo = 0
let ammoTimer = 0
let mode = ""
let tail = snake[2]
createTable()
snake.forEach(i => squares[i].classList.add("snake"))
highScore.innerHTML = localStorage.getItem("score")

if(localStorage.getItem("score")==null){
    localStorage.setItem("score",0)
}


//MOVEMENT OF SNAKE & AMMO

function move(){
    if(
        (snake[0] % width === 0 && direction === -1) ||
        (snake[0] % width === width - 1 && direction === 1)||
        (snake[0] + width >= width*width  && direction == width)||
        (snake[0] - width < 0 && direction === -width) ||
        (squares[snake[0]+direction].classList.contains("snake"))
        ){
        score.innerHTML = `Game Over with "${scoreDisp}" points`
        if(parseInt(localStorage.getItem("score")) < scoreDisp){
            localStorage.setItem("score", scoreDisp)
            highScore.textContent = localStorage.getItem("score")
        }
        return clearInterval(timerId)
    }
    tail = snake.pop()
    squares[tail].classList.remove("snake")
    snake.unshift(snake[0]+direction)
    squares[snake[0]].classList.add("snake")

    if(snake[0] === apple){
        squares[apple].classList.remove("apple")
        scoreDisp += 1
        score.innerHTML = scoreDisp
        generateApple()
        snake.push(tail)
        squares[tail].classList.add("snake")
        clearInterval(timerId)
        speed = speed * 0.9
        timerId = setInterval(move, speed)
        if(parseInt(localStorage.getItem("score")) < scoreDisp){
            localStorage.setItem("score", scoreDisp)
            highScore.textContent = localStorage.getItem("score")
        }
    }

    movementReady = true

}

function moveHard(){
    if(
        (snake[0] % width === 0 && direction === -1) ||
        (snake[0] % width === width - 1 && direction === 1)||
        (snake[0] + width >= width*width  && direction == width)||
        (snake[0] - width < 0 && direction === -width) ||
        (squares[snake[0]+direction].classList.contains("snake"))
        ){
        score.innerHTML = `Game Over with "${scoreDisp}" points`
        if(parseInt(localStorage.getItem("score")) < scoreDisp){
            localStorage.setItem("score", scoreDisp)
            highScore.textContent = localStorage.getItem("score")
        }
        return clearInterval(timerId)
    }
    tail = snake.pop()
    squares[tail].classList.remove("snake")
    snake.unshift(snake[0]+direction)
    squares[snake[0]].classList.add("snake")

    if(snake[0] === apple){
        squares[apple].classList.remove("apple")
        scoreDisp += 1
        score.innerHTML = scoreDisp
        generateApple()
        snake.push(tail)
        squares[tail].classList.add("snake")
        clearInterval(timerId)
        speed = speed * 0.9
        timerId = setInterval(moveHard, speed)
        if(parseInt(localStorage.getItem("score")) < scoreDisp){
            localStorage.setItem("score", scoreDisp)
            highScore.textContent = localStorage.getItem("score")
        }
    }


    movementReady = true

}

function ammoShot(){
    if(
        (ammo % width === 0 && ammoDirection === -1)||
        (ammo % width === width-1 && ammoDirection === 1)||
        (ammo + width >= width*width && ammoDirection == width)||
        (ammo - width < 0 && ammoDirection === -width)
        ){
        ammoReady= true
        squares[ammo].classList.remove("ammo")
        squares[ammo].innerHTML = "" //!!!
        return clearInterval(ammoTimer)
    }
    squares[ammo].classList.remove("ammo")
    squares[ammo].innerHTML = "" //!!!
    ammo += ammoDirection
    squares[ammo].classList.add("ammo")
    squares[ammo].innerHTML = "•"

    if(ammo === apple){
        squares[apple].classList.remove("apple")
        squares[ammo].classList.remove("ammo")
        squares[ammo].innerHTML = "" //!!!
        scoreDisp += 1
        score.innerHTML = scoreDisp
        generateApple()
        snake.push(tail)
        squares[tail].classList.add("snake")
        clearInterval(timerId)
        clearInterval(ammoTimer)
        speed = speed * 0.9
        timerId = setInterval(moveHard, speed)
        if(parseInt(localStorage.getItem("score")) < scoreDisp){
            localStorage.setItem("score", scoreDisp)
            highScore.textContent = localStorage.getItem("score")
        }
        ammoReady = true

    }

}

//GENERATING APPLE

function generateApple(){
    
    do{
        apple = Math.floor(Math.random() * size)
    }while(snake.includes(apple))

    squares[apple].classList.add("apple")


}

//BUTTON FUNCTIONS AND TABLE

function start(){
    mode = "standart"
    clearInterval(timerId)
    scoreDisp = 0
    speed = 600
    snake.forEach(i => squares[i].classList.remove("snake"))
    squares[apple].classList.remove("apple")
    snake = [2,1,0]
    tail = snake[2]
    direction = 1
    snake.forEach(i => squares[i].classList.add("snake"))
    generateApple()
    score.innerHTML = scoreDisp
    timerId = setInterval(move, speed)

}

function startHard(){
    mode = "hard"
    clearInterval(timerId)
    scoreDisp = 0
    speed = 500
    snake.forEach(i => squares[i].classList.remove("snake"))
    squares[apple].classList.remove("apple")
    snake = [2,1,0]
    tail = snake[2]
    direction = 1
    snake.forEach(i => squares[i].classList.add("snake"))
    generateApple()
    score.innerHTML = scoreDisp
    timerId = setInterval(moveHard, speed)

}


function createTable(){
    for (i=0; i<size; i++){
        let square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}

//EVENT LISTENERS

btn.addEventListener("click", start)

hardBtn.addEventListener("click", startHard)

helpBtn.addEventListener("click", ()=>{
    if (helpBtnReady){
        modal.style.display = "block"
    }else{
        modal.style.display = "none"        
    }
    helpBtnReady = !helpBtnReady
})


document.addEventListener("keydown", (e) => {
    if(e.key === "f" && mode === "hard" && ammoReady){
        ammoDirection = JSON.parse(JSON.stringify(direction))
        ammo = JSON.parse(JSON.stringify(snake[0]+ammoDirection))
        clearInterval(ammoTimer)
        ammoTimer = setInterval(ammoShot,speed/6)
        ammoReady=false
    }

})


document.addEventListener("keydown", (e) => {
    if(movementReady){
        if(e.key === "ArrowRight" && direction != -1){
            direction = 1
            
        }else if(e.key === "ArrowLeft"  && direction != 1){
            direction = -1

        }else if(e.key==="ArrowDown" && direction != -width){
            direction = width

        }else if(e.key ==="ArrowUp" && direction != width){
            direction = -width
        }
        movementReady = false
    }

})
