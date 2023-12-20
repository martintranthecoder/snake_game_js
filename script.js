// define HTML elements
const board = document.querySelector("#game-board");
const startText = document.querySelector("#instruction-text");

// define game variables
const gridSize = 20; // order matters
let snake = [{x: 10, y: 10}]; // head of the snake 
let food = generateFood();
let direction = "up";



//Draw game map, snake and food
function draw() {
    //every time it draws, it clears the board
    board.innerHTML = "";
    drawSnake();
    drawFood();
}

// function drawSnake() {
//     snake.forEach(segment => {
//         const snakeElement = document.createElement("div");
//         snakeElement.style.gridRowStart = segment.x;
//         snakeElement.style.gridColumnStart = segment.y;
//         snakeElement.classList.add("snake");
//         board.appendChild(snakeElement);
//     });
// }

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

    snake.pop(); // remove the last element of the snake to make it move but doesn't grow


}

//test move()
// setInterval(() => {
//     move();
//     draw();
// }, 1000)





// Functions I would add after finishing the tutorial

/* Borders, Mines, Game size adjustment, Food items,
 Randomly placed food items, Food detection, Wall detection, 
 User input, Snake movement, Contact recognition, Eating food, 
 Game loop, Game over */