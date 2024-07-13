var prevMousePressed = false;
var mouseIsReleased = false;


let currentState = 'startScreen';
let spaceBackground;
let optionBackground;
let levelsBackground;
let backButton;
let gameNames = ['AimBot', 'SpeedTyper', 'KeyNote'];
let levelNames = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];
let startButton;
let gameButton;
let gameSelected = -1;

//Aimbot variables
let dots = [];
let numDots = 20;
let goal = 20;
let dotSize = 30;
let timer, score, startTime, accuracy, totalClicks;
let gameOver = false;
let gameMessage = "";  

numDotsArray = [20,35,45,60];
goalArray = [20,35,45,60];
dotSizeArray = [30,30,20,20];

//Speedtyper variables
let currentPhrase = '';
let currentInput = '';
let timerDuration = 60; // Duration of the timer in seconds
let startTimeType;
let timeRemaining;
let gameStarted = false;
let totalCharactersTyped = 0;
let totalCorrectCharacters = 0;
let phrasesTypedCorrectly = 0;
let accuracyType = 0;
let backspaceAllowed = false;
let bgImage; // Variable to hold the background image

let ptcThreshold = 2;
let accThreshold = 75;
let ptcArray = [2,4,5,6];
let accArray = [75,75,80,87]


//keyNote variables
let tiles = [];
let tileSize = 100;
let scorek = 0;
let startTimek;
let timerk = 15;
let gameOverk = false;
let winThreshold = 10; // Adjust the win threshold as needed
let lanes = ['f', 'g', 'h', 'j'];
let hitSound = "C:\Users\anany\Downloads\WhatsApp Audio 2023-11-20 at 21.14.21.mpeg";
let backgroundImage;
let backgroundMusic;
let restartPromptVisible = false;
let resetCount = 60;
let resetCountArray = [60,60,60,30];
let timerkArray = [15,30,45,60];

let tileSpeed = 5;
let tileSpeedArray = [5,7,10,12];
function preload() {
  backgroundImage = loadImage('https://imgs.search.brave.com/UGiipywMEmiZUgw5FJD7-bBJM7_a880CTNraH84cuHY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvZmVhdHVy/ZWQvc3BhY2UtYmFj/a2dyb3VuZC1odHln/a3RhOHo2bzNtY3gy/LmpwZw');
  bgImage = loadImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f34b0586-692c-494e-a277-6f6a3622c755/dajhzwe-e96e4546-d0f1-4390-a003-37fea8ed11ef.jpg/v1/fill/w_1024,h_573,q_75,strp/subtle_rainbow_colours_of_space_by_kihoskh714_dajhzwe-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTczIiwicGF0aCI6IlwvZlwvZjM0YjA1ODYtNjkyYy00OTRlLWEyNzctNmY2YTM2MjJjNzU1XC9kYWpoendlLWU5NmU0NTQ2LWQwZjEtNDM5MC1hMDAzLTM3ZmVhOGVkMTFlZi5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Jq90E1ISs4VGaryQSn26xSjadvXz-wLfz-xtjVSyqKw'); 
  spaceBackground = loadImage('https://t3.ftcdn.net/jpg/05/58/61/32/360_F_558613274_Z1zbjnHZKjpnTvvsjfZzYXk2TIeUl54a.jpg'); // Load the space background image
  optionBackground = loadImage('https://static.vecteezy.com/system/resources/previews/024/352/444/large_2x/space-wallpaper-banner-background-stunning-view-of-a-cosmic-galaxy-with-planets-and-space-objects-elements-of-this-image-furnished-by-nasa-generate-ai-free-photo.jpg'); // Load the options background image
  levelsBackground = loadImage('https://media.istockphoto.com/id/178149253/photo/deep-space-background.jpg?b=1&s=612x612&w=0&k=20&c=UWheinVHEkSamqeXD1cOv80kgdWHMeKXjU7EJy9-j5U='); // Load the levels background image
  backButton = loadImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxwxr-D-CVpoHP0vEXCYJF9u-yMLeKGl53pg&usqp=CAU'); // Load the back arrow image
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER, CENTER);

  if (currentState === 'startScreen') {
    // Define the "Start" button only on the start screen
    startButton = createButton('Start');
    startButton.position(width / 2 - 100, height / 2);
    startButton.size(200, 60);
    startButton.mouseReleased(() => {
      startButton.hide(); // Hide the "Start" button
      currentState = 'optionsScreen';
    });
  }
}

function draw() {
  if(prevMousePressed && !mouseIsPressed){
    mouseIsReleased = true;
  } else {
    mouseIsReleased = false;
  }
  
  if (currentState === 'startScreen') {
    background(spaceBackground);
    fill(255);
    textSize(48);
    text('Welcome to Astro Voyage!', width / 2, height / 4);
  } else if (currentState === 'optionsScreen') {
    background(optionBackground);

    // Display the back arrow
    image(backButton, 20, 20, 40, 40); // Adjust the position and size as needed

    // Display the options
    displayOptions();
  } else if (currentState === 'levelsScreen') {
    background(levelsBackground);

    // Display the back arrow
    image(backButton, 20, 20, 40, 40); // Adjust the position and size as needed

    // Display the levels
    background(levelsBackground);
    displayLevels();

    // Display the back arrow
    image(backButton, 20, 20, 40, 40);
  } else if(currentState == 'Aimbot'){
    displayAimbot();        
  } else if(currentState == 'SpeedTyper'){
    displaySpeedTyper();
  } else if(currentState == 'KeyNote'){
    displayKeyNote();
  }
  
  
  prevMousePressed = mouseIsPressed;

}

function displayKeyNote(){
  background(backgroundImage);

  if (!gameOverk) {
    if (frameCount % resetCount == 0) {
      let lane = int(random(4)); // Random lane (0, 1, 2, 3)
      tiles.push(new Tile(lanes[lane]));
    }

    // Sort the tiles based on the y position in descending order
    tiles.sort((a, b) => b.y - a.y);

    for (let i = tiles.length - 1; i >= 0; i--) {
      let tile = tiles[i];
      tile.move();
      tile.display();

      if (tile.y > height) {
        if (!tile.hit) {
          gameOverk = true; // End the game if a non-hit tile touches the bottom
        }
        tiles.splice(i, 1);
      }
    }

    if (millis() - startTimek >= 1000) {
      timerk--;
      startTimek = millis();
    }
  }

  if (timerk <= 0) {
    if (scorek >= winThreshold) {
      displayWinScreen();
    } else {
      gameOverk = true;
    }
  }
  
  fill(255, 0, 0);
  textSize(24);
  text("Time: " + timerk, 60, 30);
  text("Score: " + scorek, width - 60, 30);

  if (gameOverk) {
    displayGameOverScreen();
    restartPromptVisible = true; // Set restart prompt visibility to true
  }

  if (restartPromptVisible) {
    fill(255);
    textSize(20);
    text("Press Space to Restart", width / 2, height - 30);
  }
}

function displayAimbot(){
   if (!gameOver) {
    // Set the background color to black
    background(0);

    let elapsed = (millis() - startTime) / 1000;
    timer = 60 - int(elapsed);

    // Calculate accuracy based on the number of clicks
    if (totalClicks > 0) {
      accuracy = (score / totalClicks) * 100;
    } else {
      accuracy = 0;
    }

    // Set the text color to white
    fill(255);
    textFont('Arial', 16);
    textAlign(LEFT,TOP);
    text(`Timer: ${timer} seconds`, 10, 20);
    text(`Score: ${score} / ${goal}`, 10, 40);
    text(`Accuracy: ${accuracy.toFixed(2)}%`, 10, 60); // Display accuracy
    textAlign(CENTER,CENTER);
    if (timer <= 0 || score >= goal) {
      gameOver = true;
      if (score >= goal && accuracy >= 75) {
        gameMessage = "You Win! Press E or e to exit.";
      } else {
        gameMessage = "Game Over. Press E or e to exit.";
      }
      text(gameMessage, width / 2 - 120, height / 2 + 30);
    } else {
      gameMessage = ""; // Clear the game message
    }

    for (let i = 0; i < numDots; i++) {
      let dot = dots[i];
      if (!dot.hit) {
        // Set dot color to white
        fill(255);
        ellipse(dot.x, dot.y, dot.size);
      }
    }
  }
}

function displaySpeedTyper(){
  background(bgImage);
 fill(255)
  if (gameStarted) {
    handleTimer();
    displayText();
    
    if (timeRemaining <= 0) {
      gameStarted = false;
      displayEndSummary();
    }
  } else {
    text('Press ENTER to start', width / 2, height / 2);
  }
}
function displayOptions() {
  fill(50, 150, 255);
  let yOffset = height / 3; // Initial vertical position
  let spacing = 100; // Spacing between options

  for (let i = 0; i < gameNames.length; i++) {
    let x = width / 2;
    let y = yOffset + i * spacing;

    // Draw a button around the game name
    let buttonWidth = 200;
    let buttonHeight = 60;
    let buttonX = x - buttonWidth / 2;
    let buttonY = y - buttonHeight / 2;

    if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY &&
      mouseY <= buttonY + buttonHeight
    ) {
      fill(100, 200, 255); // Highlight when the mouse is over the button
      if (mouseIsReleased) {
        // If the button is clicked, transition to the levels screen
        gameSelected = i;
        currentState = 'levelsScreen';
      }
    } else {
      fill(50, 150, 255);
    }

    rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
    fill(255);
    textSize(24);
    text(gameNames[i], x, y);
  }
}

function displayLevels() {
  fill(50, 150, 255);
  let yOffset = height / 3; // Initial vertical position
  let spacing = 100; // Spacing between levels

  for (let i = 0; i < levelNames.length; i++) {
    let x = width / 2;
    let y = yOffset + i * spacing;

    // Draw a button around the level name
    let buttonWidth = 200;
    let buttonHeight = 60;
    let buttonX = x - buttonWidth / 2;
    let buttonY = y - buttonHeight / 2;

    if (
      mouseX >= buttonX &&
      mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY &&
      mouseY <= buttonY + buttonHeight
    ) {
      fill(100, 200, 255); // Highlight when the mouse is over the button
      if (mouseIsReleased) {
        // If the button is clicked, perform an action (e.g., start the selected level)
        // Replace this with your desired action code.
        switch(gameSelected){
          case 0:
            currentState = "Aimbot";
            numDots = numDotsArray[i];
            goal = goalArray[i];
            dotSize = dotSizeArray[i];
            aimbotSetup();
            break;
          case 1:
            currentState = "SpeedTyper";
            ptcThreshold = ptcArray[i];
            accThreshold = accArray[i];
            speedTyperSetup();
            break;
          case 2:
            currentState = "KeyNote";
            timerk = timerkArray[i];
            resetCount = resetCountArray[i];
            tileSpeed = tileSpeedArray[i];
            keyNoteSetup();
            break;
          case 3:
            
            break;
          default:
            break;
        }
        console.log(`Selected level: ${levelNames[i]}`);
      }
    } else {
      fill(50, 150, 255);  
    }

    rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);
    fill(255);
    textSize(24);
    text(levelNames[i], x, y);
  }
}

function createDot() {
  let x = random(dotSize, width - dotSize);
  let y = random(dotSize, height - dotSize);
  return {
    x: x,
    y: y,
    size: dotSize,
    color: color(255), // Set dot color to white
    hit: false,
  };
}

function aimbotSetup() {
  //createCanvas(800, 600);

  for (let i = 0; i < numDots; i++) {
    dots.push(createDot());
  }
  timer = 60;
  score = 0;
  startTime = millis();
  accuracy = 0;
  totalClicks = 0;
  // Set the text color to white
  fill(255);
  noStroke();
  textFont('Arial', 16);
}

function mousePressed() {
  if(currentState == "Aimbot"){
    if (!gameOver) {
      totalClicks++; // Increment the total click count
      for (let i = 0; i < numDots; i++) {
        let dot = dots[i];
        let d = dist(mouseX, mouseY, dot.x, dot.y);
        if (d < dot.size / 2 && !dot.hit) {
          score++;
          dot.hit = true;
        }
      }
    }
  }
}
function keyPressed() {
  if(currentState == "Aimbot"){
    if (key === "r" || key === "R") {
      resetGame();
    }
    if ((key === "e" || key === "E") && (gameOver || (score >= goal && accuracy >= 75))) {
      exitGame();
    } //here2
  } else if(currentState == "SpeedTyper"){
    if (!gameStarted && keyCode === ENTER) {
    startGame();
  } else if (gameStarted) {
      if (keyCode === BACKSPACE && !backspaceAllowed) {
        // If backspace is not allowed, prevent its default behavior
        return false;
      }

      if (keyCode >= 32 && keyCode <= 126) {
        currentInput += key;
        totalCharactersTyped++;

        // Check if the current character is correct
        if (currentInput[currentInput.length - 1] === currentPhrase[currentInput.length - 1]) {
          totalCorrectCharacters++;
        }

        // When the current phrase is fully typed, move on to the next one
        if (currentInput.length === currentPhrase.length) {
          phrasesTypedCorrectly++;
          loadNextPhrase();
        }

        updateAccuracy();
      }
    }
  } else if(currentState == "KeyNote") {
     if (gameOverk && key === ' ') {
    // Restart the game if space bar is pressed after game over
    tiles = [];
    scorek = 0;
    startTimek = millis();
    timerk = 30;
    gameOverk = false;
    restartPromptVisible = false;
    loop(); // Restart animation loop
  } else {
    let hitBottomTile = false;
    let bottommostTileIndex = -1;

    for (let i = tiles.length - 1; i >= 0; i--) {
      let tile = tiles[i];
      if (tile.lane === key && !tile.hit) {
        if (!hitBottomTile || (hitBottomTile && tile.y > tiles[bottommostTileIndex].y)) {
          hitBottomTile = true;
          bottommostTileIndex = i;
        }
      }
    }

    if (hitBottomTile) {
      let bottommostTile = tiles[bottommostTileIndex];
      bottommostTile.hit = true;
      scorek++;

      // Move the hit meteor to the end of the array (bottom)
      tiles.splice(bottommostTileIndex, 1);
      tiles.push(bottommostTile);

      //hitSound.play();
    } else {
      gameOverk = true; // End the game if the user doesn't hit any tile
      restartPromptVisible = true; // Show restart prompt
    }
  }
  }
}

function resetGame() {
  loop();
  startTime = millis();
  score = 0;
  totalClicks = 0;
  gameOver = false;
  for (let i = 0; i < numDots; i++) {
    dots[i] = createDot();
  }
}

function exitGame() {
  currentState = "optionsScreen"; // Remove the canvas to exit the game
}

function displayWinScreen() {
  fill(0, 0, 0);
  textSize(48);
  text("You Win!", width / 2, height / 2 - 50); // Adjust position for better layout
  textSize(24);
  text("Score: " + scorek, width / 2, height / 2 + 50); // Display the score
  noLoop(); 
  
  //here
}

function displayGameOverScreen() {
  fill(0, 0, 0);
  textSize(48);
  text("Game Over", width / 2, height / 2 - 50); // Adjust position for better layout
  textSize(24);
  text("Score: " + scorek, width / 2, height / 2 + 50); // Display the score
  //noLoop();
}

function mouseClicked() {
  if (currentState === 'optionsScreen' && mouseX <= 60 && mouseY <= 60) {
    // Check if the user clicked the back arrow from options to start screen
    currentState = 'startScreen';
    if (startButton) {
      startButton.show(); // Show the "Start" button when going back to the start screen
    }
  } else if (currentState === 'levelsScreen' && mouseX <= 60 && mouseY <= 60) {
    // Check if the user clicked the back arrow from levels to options screen
    currentState = 'optionsScreen';
  }
}

function speedTyperSetup(){
  textSize(32);
  textAlign(CENTER, CENTER);
}

function keyNoteSetup(){
  // Set the background to the loaded image
  background(backgroundImage);
  textAlign(CENTER, CENTER);
  textSize(24);
  startTimek = millis();
  
}
function displayText() {
  text(`Time: ${timeRemaining}`, width / 2, 50);
  text(`Accuracy: ${accuracyType.toFixed(2)}%`, width / 2, 90);
  text(`Phrases Completed: ${phrasesTypedCorrectly}`, width / 2, 130);

  // Display the phrase to be typed
  text(currentPhrase, width / 2, height / 2 - 20);

  // Display each character of the input with color feedback
  for (let i = 0; i < currentInput.length; i++) {
    let x = width / 2 - currentPhrase.length * 8 + i * 16; // Adjust positioning as needed
    let correct = currentInput[i] === currentPhrase[i];
    fill(correct ? 'green' : 'red');
    text(currentInput[i], x, height / 2 + 40);
  }
  fill(255); // Reset fill color for other text elements
}


function updateAccuracy() {
  accuracyType= (totalCorrectCharacters / totalCharactersTyped) * 100;
}

function loadNextPhrase() {
  if (phrases.length > 0) {
    let nextPhraseIndex = int(random(phrases.length));
    currentPhrase = phrases[nextPhraseIndex];
    phrases.splice(nextPhraseIndex, 1); // Remove the used phrase
    currentInput = ''; // Reset input for the next phrase
  }
}

function displayEndSummary() {
  textAlign(CENTER, CENTER);
  text(`Game Over`, width / 2, height / 2 + 120);
  text(`Total Accuracy: ${accuracyType.toFixed(2)}%`, width / 2, height / 2 + 160);
  let winCondition = phrasesTypedCorrectly >=ptcThreshold  && accuracyType >= accThreshold;
  text(`You ${winCondition ? 'Win!' : 'Lose!'}`, width / 2, height / 2 + 200);
  noLoop(); // Stop the drawing loop
}

function handleTimer() {
  timeRemaining = timerDuration - floor((millis() - startTimeType) / 1000);
  if (timeRemaining < 0) {
    timeRemaining = 0;
  }
}

function startGame() {
  // Reset game variables
  totalCharactersTyped = 0;
  totalCorrectCharacters = 0;
  phrasesTypedCorrectly = 0;
  accuracyType = 100;
  // Shuffle phrases and pick the first one
  shuffle(phrases, true);
  loadNextPhrase();
  startTimeType = millis(); // Capture the start time
  gameStarted = true;
  loop(); // Start the drawing loop
}

class Tile {
  constructor(lane) {
    this.x = lanes.indexOf(lane) * tileSize;
    this.y = 0;
    this.speed = tileSpeed;
    this.lane = lane; // Corresponding key
    this.hit = false;
    this.color = color(255, 0, 0);
  }

  move() {
    this.y += this.speed;
  }

  display() {
    if (this.hit) {
      fill(0, 255, 0);
    } else {
      fill(this.color);
    }
    ellipse(this.x + tileSize / 2, this.y + tileSize / 2, tileSize, tileSize);

    fill(255); // Set text color to white
    textSize(16);
    text(this.lane.toUpperCase(), this.x + tileSize / 2, this.y + tileSize / 2);
  }
}

let phrases = [
  "Absence makes the heart grow fonder",
"Actions speak louder than words",
"All good things must come to an end",
"A picture is worth a thousand words",
"A watched pot never boils",
"Beggars cant be choosers",
"Beauty is in the eye of the beholder",
"Better late than never",
"Birds of a feather flock together",
"Cleanliness is next to godliness",
"Dont bite the hand that feeds you",
"Dont count your chickens before they hatch",
"Dont judge a book by its cover",
"Dont put all of your eggs in one basket",
"Dont put too many irons in the fire",
"Easy come easy go",
"Fortune favors the bold",
"God helps those who help themselves",
"Good things come to those who wait",
"Honesty is the best policy",
"Hope for the best prepare for the worst",
"If it aint broke don’t fix it",
"If you play with fire youll get burned",
"Knowledge is power",
"Laughter is the best medicine",
"Like father like son",
"No man is an island",
"Practice makes perfect",
"The early bird gets the worm",
"The enemy of my enemy is my friend",
"The grass is always greener on the other side",
"The pen is mightier than the sword",
"There is no place like home",
"There is no such thing as a free lunch",
"There is no time like the present",
"The squeaky wheel gets the grease",
"Time is money",
"Two heads are better than one",
"Two wrongs dont make a right",
"When in Rome do as the Romans do",
"Where theres smoke there’s fire",
"You cant always get what you want",
];
