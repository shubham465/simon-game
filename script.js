let sequence = [];
let userSequence = [];
let level = 0;
let gameStarted = false;

// Get DOM elements
const greenBtn = document.getElementById("green-btn");
const redBtn = document.getElementById("red-btn");
const yellowBtn = document.getElementById("yellow-btn");
const blueBtn = document.getElementById("blue-btn");

const messageDiv = document.getElementById("message");

// Array of buttons for easy access
const buttons = [greenBtn, redBtn, yellowBtn, blueBtn];


// Button click event listeners for user input
buttons.forEach(button => {
    button.addEventListener("click", function() {
        if (gameStarted) {
            const color = button.classList[1]; // Get the color name (e.g., green, red)
            userSequence.push(color);
            flashButton(button);
            checkUserInput();
        }
        else{
          startGame()
        }
    });
});

// Start a new game
function startGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    gameStarted = true;
    messageDiv.innerHTML = "Level 1";
    setTimeout(nextLevel, 500);
}

// Flash a button
function flashButton(button) {
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 300);
}

function flashBackground(){
  let bbody = document.getElementById("doc-body");
  bbody.classList.add("redFlash");
  setTimeout(() => bbody.classList.remove("redFlash"), 100);
}

// Generate the next sequence and play it
function nextLevel() {
    userSequence = [];
    level++;
    messageDiv.innerHTML = `Level ${level}`;
    const randomButton = buttons[Math.floor(Math.random() * buttons.length)];
    sequence.push(randomButton.classList[1]);
    flashButton(buttons.find(button => button.classList[1] === sequence[level-1]));
}


// Check the user's input
function checkUserInput() {
    const lastColor = userSequence[userSequence.length - 1];
    const expectedColor = sequence[userSequence.length - 1];

    if (lastColor !== expectedColor) {
        gameOver();
    } else if (userSequence.length === sequence.length) {
        setTimeout(nextLevel, 1000);
    }
}

// End the game
function gameOver() {
    gameStarted = false;
    messageDiv.innerHTML = "Game Over! Press Any key to Restart";
    flashBackground()
}
