// define HTML elements
const board = document.querySelector("#game-board");
const startText = document.querySelector("#instruction-text");
const logo = document.querySelector("#logo");

// define game variables
const gridSize = 20; // order matters
let snake = [{x: 10, y: 10}]; // head of the snake 
let food = generateFood();
let direction = "up";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;


//Draw game map, snake and food
function draw() {
    //every time it draws, it clears the board
    board.innerHTML = "";
    drawSnake();
    drawFood();
}


function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement)
    }
    )
}

// create a snake or food element
function createGameElement(elementType, elementClass) {
    const element = document.createElement(elementType);
    element.className = elementClass;
    return element;
}

// set position of snake or food element
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}



function drawFood() {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}


function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    let newFoodPosition = {x, y};
    snake.forEach((segment) => {
        if (segment.x === newFoodPosition.x && segment.y === newFoodPosition.y) {
            newFoodPosition = generateFood();
        }
    })
    return newFoodPosition;
}


function move(){
    const head = {...snake[0]} // copy the head of the snake if u use snake[0] it will change the original snake
    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }

    snake.unshift(head); // add the new head to the snake


    if (head.x === food.x && head.y === food.y){
        food = generateFood();
        clearInterval(); // stop the interval
        gameInterval = setInterval( () => {
            move();
            draw();
        }, gameSpeedDelay);

    } else {
        snake.pop();
    }

}


// // test move()
// setInterval(() => {
//     move();
//     draw();
// }, 1000)

//start game function
function startGame() {
    gameStarted = true;
    startText.style.display = "none";
    logo.style.display = "none";
    gameInterval = setInterval( () => {
        move();
        moveOutOfBounds();
        checkCollision();
        draw();
    }, gameSpeedDelay); // use setInterval(func, delay)
}

//keydown event listener
function handleKeyDown(event) {
    if (!gameStarted && event.code === "Space") {
        startGame();
    } else {
        switch(event.code) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    }
}
document.addEventListener("keydown", handleKeyDown);

// check collision
function checkCollision() {

}

// move snake is out of bounds  
function moveOutOfBounds() {
    for (let i = 0; i < snake.length; i++){
        if (snake[i].x < 1) {
            snake[i].x = gridSize;
        } else if (snake[i].x > gridSize) {
            snake[i].x = 1;
        } else if (snake[i].y < 1) {
            snake[i].y = gridSize;
        } else if (snake[i].y > gridSize) {
            snake[i].y = 1;
        }
    }
}



// Functions I would add after finishing the tutorial

/* Borders, Mines, Game size adjustment, Food items,
 Randomly placed food items, Food detection, Wall detection, 
 User input, make movement, Contact recognition, Eating food, 
 Game loop, Game over */