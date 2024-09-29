
const mainMenu = document.getElementById('main-menu');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const background = document.getElementById('background');
const dialogueText = document.getElementById('dialogue-text');
const characterNameDisplay = document.getElementById('character-name');
const characterHeadDisplay = document.getElementById('character-head');

let characterName;

const characterHeadImages = {
    'characterName': 'Assets/Images/DuckFace.png',
    'Suki': 'Assets/Images/DuckFaceSuki.png',
    'Tori': 'Assets/Images/DuckFaceTori.png'
};

const gameData = [
    {
        background: 'Assets/Images/TestBG.png',
        dialogues: [
            { name: 'characterName', text: "Wassup Dog"},
            { name: 'Suki', text: "Hey Drake! Are you ready to quack your way through this journey?"}
        ]
    },
    {
        background: 'Assets/Images/TestBG.png',
        dialogues: [
            { name: 'Tori', text: "I think I like someone here." },
            { name: 'Tori', text: "But I'm too shy to say anything..." }
        ]
    }
];


let currentScene = 0;
let currentDialogue = 0;

// Starting the game
startBtn.addEventListener('click', () => {
    storePlayerName();
    mainMenu.style.display = 'none';
    gameScreen.style.display = 'block';
    loadScene(currentScene);
});

function loadScene(sceneIndex) {
    const scene = gameData[sceneIndex];
    background.src = scene.background;
    currentDialogue = 0;
    showDialogue(scene.dialogues[currentDialogue]);
}

// Change the character head image
function updateHeadIcon(characterName) {
    const headIcon = characterHeadImages[characterName];
    if (headIcon) {
        characterHeadDisplay.src = headIcon;
    }
}

// Display the dialogue based on if its the player or fixed charcters
function showDialogue(dialogue) {
    const playerName = localStorage.getItem('playerName') || "Drake";
    if (dialogue.name === 'characterName') {
        characterNameDisplay.textContent = playerName; // Drake or Custom Name
    } else {
        characterNameDisplay.textContent = dialogue.name; // Suki, Tori, etc.
    }

    updateHeadIcon(dialogue.name);
    dialogueText.textContent = dialogue.text; // view the dialogue text
}

// Store the player's name in the local storage
function storePlayerName() {
    if (document.getElementById('name-input').value === '') {
        characterName = "Drake";
        localStorage.setItem('playerName', characterName);
    } else {
        characterName = document.getElementById('name-input').value; // Get the value of the input field
        localStorage.setItem('playerName', characterName); // Store the value in the local storage
    }
}

// Function to Advance Dialogue
nextBtn.addEventListener('click', () => {
    const scene = gameData[currentScene];
    currentDialogue++;
    
    if (currentDialogue < scene.dialogues.length) {
        showDialogue(scene.dialogues[currentDialogue]);
    } else {
        // Move to the next scene or end the game
        currentScene++;
        if (currentScene < gameData.length) {
            loadScene(currentScene);
        } else {
            alert("Game Over! Thanks for playing!");
        }
    }

});