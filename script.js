const btn = document.getElementById("btn")
const grid = document.querySelector(".grid")
let score = document.getElementById("score")
const highScore = document.getElementById("high-score")
const hardBtn = document.getElementById("hard-btn")
const size = 400
let squares = []
let snake = [2,1,0]
let direction = 1
width = 20
let timerId = 0
let speed = 400
let apple = 0
let scoreDisp = 0
createTable()
snake.forEach(i => squares[i].classList.add("snake"))
highScore.innerHTML = localStorage.getItem("score")

if(localStorage.getItem("score")==null){
    localStorage.setItem("score",0)
}

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
    const tail = snake.pop()
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

}



function generateApple(){
    
    do{
        apple = Math.floor(Math.random() * size)
    }while(snake.includes(apple))

    squares[apple].classList.add("apple")


}


document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowRight"){
        if(direction != -1){
            direction = 1
        }

    }else if(e.key === "ArrowLeft"){
        if(direction != 1){
            direction = -1
        }
        
    }else if(e.key==="ArrowDown"){
        if(direction != -width){
            direction = width
        }
    }else if(e.key ==="ArrowUp"){
        if(direction != width){
            direction = -width
        }
    }

})

function start(){
    clearInterval(timerId)
    scoreDisp = 0
    speed = 500
    snake.forEach(i => squares[i].classList.remove("snake"))
    squares[apple].classList.remove("apple")
    snake = [2,1,0]
    direction = 1
    snake.forEach(i => squares[i].classList.add("snake"))
    generateApple()
    score.innerHTML = scoreDisp
    timerId = setInterval(move, speed)

}

function startHard(){
    clearInterval(timerId)
    scoreDisp = 0
    speed = 200
    snake.forEach(i => squares[i].classList.remove("snake"))
    squares[apple].classList.remove("apple")
    snake = [2,1,0]
    direction = 1
    snake.forEach(i => squares[i].classList.add("snake"))
    generateApple()
    score.innerHTML = scoreDisp
    timerId = setInterval(move, speed)

}


function createTable(){
    for (i=0; i<size; i++){
        let square = document.createElement("div")
        square.classList.add("square")
        grid.appendChild(square)
        squares.push(square)
    }
}

btn.addEventListener("click", start)

hardBtn.addEventListener("click", startHard)
