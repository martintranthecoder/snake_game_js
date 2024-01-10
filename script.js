// define HTML elements
const board = document.querySelector("#game-board");
const startText = document.querySelector("#instruction-text");
const logo = document.querySelector("#logo");
const score = document.querySelector("#score");
const highScore = document.querySelector("#highScore");

// define game variables
const gridSize = 20; // order matters
let snake = [{x: 10, y: 10}]; // head of the snake 
let mines = generateMines();
let food = generateFood();
let direction = "up";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;
let highScoreValue = 0;



//Draw game map, snake and food
function draw() {
    //every time it draws, it clears the board
    board.innerHTML = "";
    drawSnake();
    drawFood();
    drawMines();
    updateScore();
}


function drawSnake() {
    if ( gameStarted ) {
        snake.forEach((segment) => {
            const snakeElement = createGameElement("div", "snake");
            setPosition(snakeElement, segment);
            board.appendChild(snakeElement)
        }
        )
    }
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


//draw mines
function drawMines() {
    if (gameStarted) {
        mines.forEach((mine) => {
            const mineElement = createGameElement("div", "mine");
            setPosition(mineElement, mine);
            board.appendChild(mineElement);
        })
    }
}

function generateMines() { 
    let generatedMines = [];
    for (let i = 0; i < 5; i++) {
        const x = Math.floor(Math.random() * gridSize) + 1;
        const y = Math.floor(Math.random() * gridSize) + 1;
        let newMinePosition = {x, y};
        generatedMines.push(newMinePosition);
    } 

    return generatedMines;
}


function drawFood() {
    if (gameStarted) { 
        const foodElement = createGameElement("div", "food");
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}


function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    let newFoodPosition = {x, y};
    // check if food is on the snake and mines
    snake.forEach((segment) => {
        if (segment.x === newFoodPosition.x && segment.y === newFoodPosition.y) {
            newFoodPosition = generateFood();
        }
    })
    mines.forEach((mine) => {
        if (mine.x === newFoodPosition.x && mine.y === newFoodPosition.y) {
            newFoodPosition = generateFood();
        }
    })

    return newFoodPosition;
}




function move(){
    const head = {...snake[0]}; // copy the head of the snake if u use snake[0] it will change the original snake
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
        increaseSpeed();
        clearInterval(gameInterval); // stop the interval
        gameInterval = setInterval( () => {
            move();
            moveOutOfBounds();
            checkCollision();
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
    if ( (!gameStarted && event.code === "Space" ) ||
         (!gameStarted && event.code === ' ' ) ) {
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
    const head = snake[0];
    for (let i = 1 ; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
          resetGame();
        } 
        // else if (head.x === mines[j].x && head.y === mines[j].y) {
        //     resetGame();
        // }
      }
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

// increase speed
function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }   
}

// reset game   
function resetGame() {
    updateHighScore();
    stopGame();
    snake = [{x: 10, y: 10}];
    food = generateFood();
    direction = "up";
    gameSpeedDelay = 200;
    mines = generateMines();
    updateScore();
}

// update score
function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
}

// update high score
function updateHighScore() {
    const currentScore = snake.length - 1;
    if (currentScore > highScoreValue) {
        highScore.textContent = currentScore.toString().padStart(3, "0");   
    }
    highScore.style.display = "block";
}

// stop game
function stopGame() {
    gameStarted = false;
    clearInterval(gameInterval);
    startText.style.display = "block";
    logo.style.display = "block";
}

